  Template.it.helpers({
     skills: function () {
         return Skills.find({},{sort: {skill: 1}});
     }
  });

  
  Template.it.rendered = function() {

    var data = Template.instance().data;
    
   $('.progress-bar').each(function() {
     // console.log('okey iterating throug progress bar'+$( this ).attr('id'));
       console.log('id: rendered:'+$(this).attr('id'));

    //  $(this).appear(function() {
     $(this).appear(function() {
        console.log('really appeared:'); //+$('#skill_'+data._id).attr('id'));
        //var percent = ($("#skill_"+data._id).attr('aria-valuenow')*100);
        //$("#skill_"+data._id).animate({'width' : (percent) + '%'});

        // $("#skill_"+data._id).parent('.progress').prev('.progress-title').find('.p-coutn').countTo({
        //   from: 0,
        //   to: percent,
        //   speed: 900,
        //   refreshInterval: 30
        // });
      });

   }); 

    // var data = Template.instance().data;
    //   var newWidth = $('#skill_'+data._id).parent().width() * data.percent;
    //   $('#skill_'+data._id).animate({
    //     width: newWidth,
    //   }, 1000);

  }