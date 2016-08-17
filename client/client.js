
if (Meteor.isClient) {

  document.title = "Nico Krause - (IT Consultant, Ex-Coworking Space Founder, Yoga Practicioner)"; 

  Template.layout.rendered  = function(){
    $('.page-loader').animate({width: 'toggle'});

  }

  Template.registerHelper( 'options', (parentContext) => { 
    //options: function () {
    console.log('parentContext:'+parentContext);
          var config = Configs.findOne({'key':parentContext.hash.field});
          return {
            type: 'textarea',
            async: true,
            position: 'left',
            value: config?config.value:'no '+parentContext.hash.field, 
            onsubmit: function (val, cb) {

                  var config = Configs.findOne({'key':parentContext.hash.field});

                  if(config==null){
                    Configs.insert({key:parentContext.hash.field, value:val});
                  }
                  else{
                    Configs.update(config._id,{$set:{value: val}});
                  }
                cb();
            }
          };
  });

  Template.education.events({
    "click .delete": function () {
      Educations.remove(this._id);
    }
  });

  Template.experience.events({
    "click .delete": function () {
      Experiences.remove(this._id);
    }
  });

  Template.skill.events({
    "click .delete": function () {
      console.log('deleting skill with id:'+this._id);
      Skills.remove(this._id);
    }
  });
  
  Template.language.events({
    "click .delete": function () {
      Languages.remove(this._id);
    }
  });

  Template.language.rendered = function() {
    var data = Template.instance().data;
    height = $('#language_'+data._id).height();
    $('#language_'+data._id).animate({
        height: 14,
    }, 2000);
  };

  Template.hobby.events({
    "click .delete": function () {
      Hobbies.remove(this._id);
    }
  });  

  

}
