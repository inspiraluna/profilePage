/*
 * (C) Copyright 2014 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
var ws = new WebSocket('wss://' + location.host + '/jWebrtc/ws');
var kurentoUtils = require('kurento-utils');
var customerSupportUser  = 'nico';
var configuration = {"iceServers":[{"urls":"stun:webrtc.a-fk.de:3478"},{"urls":"turn:webrtc.a-fk.de:3478","username":"webrtc","credential":"fondkonzept"}]};

ws.onopen = function() {
    var user = {name:customerSupportUser};
    checkOnlineStatus(user);
}

Template.webcall.rendered = function() {
    setRegisterState(NOT_REGISTERED);

    $('#videoSmall').draggable()
    videoInput = document.getElementById('videoInput');   // <video>-element
    videoOutput = document.getElementById('videoOutput'); // <video>-element
}

Template.webcall.helpers({
  peers: function () {
        console.log('peers:'+JSON.stringify(Session.get('peers')));
        return Session.get('peers'); 
  },
  onlineStatus: function(){
        console.log('onlineStatus:'+JSON.stringify(Session.get('onlineStatus')));
        return Session.get('onlineStatus');
  },
  online: function(){
      var status = Session.get('onlineStatus');
      if(status.response=='online') {
        return true;
      }
      else return false;
  },
  callstate: function(){
    return  Session.get("callState");
  },
  registerState: function(state){
    console.log('asking for state:'+state);
    return Session.get("registerState")==state;
  }

});

Template.webcall.events({
  "click #register": function () {
      register();
  },
  "click #call": function () {
      call();
  },
  "click #terminate": function () {
      stop();
  },
  "keydown #name": function(event){
    if (event.keyCode == 13) register();
  }
});

var videoInput;
var videoOutput;
var webRtcPeer;
var response;
var callerMessage;
var from;
var myConsultant = {name: '', status: ''};

var registerName = null;
//var registerState = null;
const NOT_REGISTERED = 0;
const REGISTERING = 1;
const REGISTERED = 2;

function setRegisterState(nextState) {
  switch (nextState) {
  case NOT_REGISTERED:
    enableButton('#register'); // ,'register()'
    setCallState(NO_CALL);
    break;
  case REGISTERING:
    disableButton('#register');
    break;
  case REGISTERED:
    disableButton('#register');
    setCallState(NO_CALL);
    break;
  default:
    return;
  }
  
  Session.set("registerState",nextState);
}

//var callState = null;
const NO_CALL = 0;          // client is idle
const PROCESSING_CALL = 1;  // client is about to call someone (ringing the phone)
const IN_CALL = 2;          // client is talking with someone
const IN_PLAY = 4;          // client is replaying a record

function setCallState(nextState) {
  switch (nextState) {
  case NO_CALL:
    enableButton('#call'); //'call()'
    disableButton('#terminate');
    disableButton('#play');
    break;
  case PROCESSING_CALL:
    disableButton('#call');
    disableButton('#terminate');
    disableButton('#play');
    break;
  case IN_CALL:
    disableButton('#call');
    enableButton('#terminate'); //'call()'
    disableButton('#play');
    break;
  case IN_PLAY:
    disableButton('#call');
    enableButton('#terminate'); //, 'stop()'
    disableButton('#play');
    break;
  default:
    return;
  }
  Session.set("callState",nextState);
}

window.onbeforeunload = function() {
  ws.close();
}

ws.onmessage = function(message) {
  var parsedMessage = JSON.parse(message.data);
  console.info('Received message: ' + message.data);

  if(parsedMessage.params){
        readAppConfig(parsedMessage);
  }
  else{
      switch (parsedMessage.id) {
        case 'registerResponse':
            registerResponse(parsedMessage);
          break;
        case 'registeredUsers':
            updateRegisteredUsers(JSON.parse(parsedMessage.response));
          break;
        case 'callResponse':
            callResponse(parsedMessage);
          break;
        case 'incomingCall':
          incomingCall(parsedMessage);
          break;
        case 'startCommunication':
          startCommunication(parsedMessage);
          break;
        case 'stopCommunication':
          console.info('Communication ended by remote peer');
          stop(true);
          break;
        case 'iceCandidate':
          webRtcPeer.addIceCandidate(parsedMessage.candidate, function(error) {
            if (error)
              return console.error('Error adding candidate: ' + error);
          });
          break;
        case 'playResponse':
            playResponse(parsedMessage);
            break;
        case 'playEnd':
          playEnd();
          break;
        case 'responseOnlineStatus':
            setOnlineStatus(parsedMessage);
            break;
        case 'playResponse':
            playResponse(parsedMessage);
            break;
        case 'playEnd':
            playEnd();
            break;
        default:
          console.error('Unrecognized message', parsedMessage);
        }
  }
}
function requestAppConfig(){
        console.log('requesting app config');
  var message = {
    id : 'appConfig',
                type: 'browser'
  };
  sendMessage(message);
}

function readAppConfig(message) {
  if (message.params ) {
                    configuration = message.params.pc_config;
  }
  if(message.result=="SUCCESS") return true;
}
function setOnlineStatus(message) {
    console.log('online status:'+message);
    Session.set('onlineStatus', message);
}
function checkOnlineStatus(user) {
  var message = {
    id : 'checkOnlineStatus',
    user : user.name
  };
  sendMessage(message);
}

function registerResponse(message) {
  if (message.response == 'accepted') {
    setRegisterState(REGISTERED);
    // call();
  } else {
    setRegisterState(NOT_REGISTERED);
    var errorMessage = message.message ? message.message
        : 'Unknown reason for register rejection.';
    console.log(errorMessage);
    alert('Error registering user. See console for further information.');
  }
}

function updateRegisteredUsers(userList) {
  var index = userList.indexOf(Session.get('name'));
  // var index = userList.indexOf("") don't display sessionId's
  if (index > -1) userList.splice(index, 1);
  Session.set('peers', userList);
}

function playResponse(message) {
  if (message.response != 'accepted') {
    hideSpinner(videoOutput);
    document.getElementById('videoSmall').style.display = 'block';
    alert(message.error);
    document.getElementById('peer').focus();
    setCallState(NO_CALL);
  } else {
    setCallState(IN_PLAY);
    webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
      if (error)
        return console.error(error);
    });
  }
}

function callResponse(message) {
  if (message.response != 'accepted') {
    console.info('Call not accepted by peer. Closing call');
    var errorMessage = message.message ? message.message
        : 'Unknown reason for call rejection.';
    console.log(errorMessage);
    stop();
  } else {
    setCallState(IN_CALL);
    webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
      if (error)
        return console.error(error);
    });
  }
}

function startCommunication(message) {
  setCallState(IN_CALL);
  webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
    if (error)
      return console.error(error);
  });
}

function incomingCall(message) {
  // If busy just reject without disturbing user
  if (Session.get('callstate') != NO_CALL) {
    var response = {
      id : 'incomingCallResponse',
      from : message.from,
      callResponse : 'reject',
      message : 'bussy'
    };
    return sendMessage(response);
  }

  setCallState(PROCESSING_CALL);
  if (confirm('User ' + message.from
      + ' is calling you. Do you accept the call?')) {

    console.log("accepting call");
    showSpinner(videoInput, videoOutput);

    from = message.from;
   // var iceServers = {"iceServers":[{"urls":"turn:5.9.154.226:3478?transport=tcp","username":"akashionata","credential":"silkroad2015"}]};
    
    var options = {
      localVideo : videoInput,
      remoteVideo : videoOutput,
      onicecandidate : onIceCandidate,
      onerror : onError
    }
    options.configuration  = configuration;

    webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options,
        function(error) {
          if (error) {
            return console.error(error);
          }
          webRtcPeer.generateOffer(onOfferIncomingCall);
        });

  } else {
    var response = {
      id : 'incomingCallResponse',
      from : message.from,
      callResponse : 'reject',
      message : 'user declined'
    };
    sendMessage(response);
    stop();
  }
}

function onOfferIncomingCall(error, offerSdp) {
  if (error)
    return console.error("Error generating the offer");
  var response = {
    id : 'incomingCallResponse',
    from : from,
    callResponse : 'accept',
    sdpOffer : offerSdp
  };
  sendMessage(response);
}

function register() {
  var name = document.getElementById('name').value;
  if (name == '') {
    window.alert('You must insert your user name');
    return;
  }
  setRegisterState(REGISTERING);
  Session.set('name', name);

  var message = {
    id : 'register',
    name : name
  };
  sendMessage(message);
 /// document.getElementById('peer').focus();
}

function call() {
  // if (document.getElementById('peer').value == '') {
  //   window.alert('You must specify the peer name');
  //   return;
  // }
  setCallState(PROCESSING_CALL);
  showSpinner(videoInput, videoOutput);

  var options = {
    localVideo : videoInput,
    remoteVideo : videoOutput,
    onicecandidate : onIceCandidate,
    onerror : onError
  }
  webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options,
      function(error) {
        if (error) {
          return console.error(error);
        }
        webRtcPeer.generateOffer(onOfferCall);
      });
}

function play() {
  var peer = document.getElementById('peer').value;
  if (peer == '') {
    window.alert('You must specify the peer name');
    document.getElementById('peer').focus;
    return;
  }

  document.getElementById('videoSmall').display = 'none';
  setCallState(IN_PLAY);
  showSpinner(videoOutput);

  var options = {
    remoteVideo: videoOutput,
    onicecandidate: onIceCandidate
  }
  options.configuration  = configuration;
  webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
    function(error) {
      if (error) {
        return console.error(error);
      }
      this.generateOffer(onOfferPlay);
    }
  )
}

function onOfferCall(error, offerSdp) {
  if (error) {
    return console.error('Error generating the offer');
  }
  console.log('Invoking SDP offer callback function');
  //var to = $('#peer').val();
  //if(to==null || to=="")
 // var to = customerSupportUser;
  var message = {
    id : 'call',
    from : Session.get('name'),
    to: customerSupportUser,
    sdpOffer : offerSdp
  };
  console.log(message);
  sendMessage(message);
}

function onOfferPlay(error, offerSdp) {
  if (error) {
    return console.error('Error generating the offer');
  }
  console.log('Invoking SDP offer callback function');
  var message = {
    id : 'play',
    user : Session.get('name'),
    sdpOffer : offerSdp
  };
  sendMessage(message);
}

function playEnd() {
  setCallState(NO_CALL);
  hideSpinner(videoInput, videoOutput);
  document.getElementById('videoSmall').style.display = 'block';
}

function stop(message) {
  console.log("Stopping");
  var stopMessageId = (Session.get('callstate') == IN_CALL || Session.get('callstate') == PROCESSING_CALL) ? 'stop' : 'stopPlay';
  setCallState(NO_CALL);
  if (webRtcPeer) {
    webRtcPeer.dispose();
    webRtcPeer = null;

    if (!message) {
      var message = {
        id : stopMessageId
      }
      sendMessage(message);
    }
  }
  hideSpinner(videoInput, videoOutput);
  document.getElementById('videoSmall').display = 'block';
}

function onError() {
  setCallState(NO_CALL);
}

function onIceCandidate(candidate) {
  console.log("Local candidate " + JSON.stringify(candidate));

  var message = {
    id : 'onIceCandidate',
    candidate : candidate
  };
  sendMessage(message);
}

function sendMessage(message) {
  var jsonMessage = JSON.stringify(message);
  console.log('Senging message: ' + jsonMessage);
  ws.send(jsonMessage);
}

function showSpinner() {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i].poster = './img/transparent-1px.png';
    arguments[i].style.background = 'center transparent url("./img/spinner.gif") no-repeat';
  }
}

function hideSpinner() {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i].src = '';
    arguments[i].poster = './img/webrtc.png';
    arguments[i].style.background = '';
  }
}

function disableButton(id) {
  $(id).attr('disabled', true);
  $(id).removeAttr('onclick');
}

function enableButton(id, functionName) {
  $(id).attr('disabled', false);
  $(id).attr('onclick', functionName);
}

/**
 * Lightbox utility (to display media pipeline image in a modal dialog)
 */
$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

