Educations = new Mongo.Collection("educations");
Experiences = new Mongo.Collection("experiences");
Skills = new Mongo.Collection("skills");
Languages = new Mongo.Collection("languages");
Hobbies = new Mongo.Collection("hobbies");
Configs = new Mongo.Collection("configs");


if (Meteor.isClient) {


  Template.body.helpers({

     headline: function () {
        var config = Configs.findOne({'key':'headline'});
         return config?config.value:'no headline';
     },
     bio: function () {
         var config = Configs.findOne({'key':'bio'}); 
         return config?config.value:'no bio';
     },
     telefon: function () {
         var config = Configs.findOne({'key':'telefon'}); 
        return (config==null)?'no telefon':config.value;
     },
     email: function () {
         var config = Configs.findOne({'key':'email'}); 
         return (config==null)?'no email':config.value;
     },
     twitter: function () {
         var config = Configs.findOne({'key':'twitter'}); 
        return (config==null)?'no twitter':config.value;
     },
     facebook: function () {
         var config = Configs.findOne({'key':'facebook'}); 
         return (config==null)?'no facebook':config.value;
     },
     skype: function () {
         var config = Configs.findOne({'key':'skype'}); 
         return (config==null)?'no skype':config.value;
     },
     educations: function () {
         return Educations.find({},{sort: {year: -1}});
     },
     experiences: function () {
         return Experiences.find({},{sort: {year: -1}});
     },
     skills: function () {
         return Skills.find({},{sort: {skill: 1}});
     },
     languages: function () {
         return Languages.find({},{sort: {language: 1}});
     },
     hobbies: function () {
         return Hobbies.find({},{sort: {hobby: 1}});
     }
  }); 

  //Languages
  Template.body.events({

    "submit .new-education": function (event) {
      event.preventDefault();

      var year = event.target.year.value;
      var headline = event.target.headline.value;
      var story = event.target.story.value;

      Educations.insert({
        year: year,
        headline: headline,
        story: story,
        createdAt: new Date()
      });

        event.target.year.value =  '';
        event.target.headline.value = '';
        event.target.story.value = '';
    },

    "submit .new-experience": function (event) {
      event.preventDefault();

      var year = event.target.year.value;
      var company = event.target.company.value;
      var headline = event.target.headline.value;
      var story = event.target.story.value;

      Experiences.insert({
        year: year,
        company: company,
        headline: headline,
        story: story,
        createdAt: new Date()
      });

      event.target.year.value =  '';
      event.target.company.value =  '';
      event.target.headline.value = '';
      event.target.story.value = '';
    },

    "submit .new-skill": function (event) {
    event.preventDefault();

    var skill = event.target.skill.value;
    var percent = event.target.percent.value;

    Skills.insert({
      skill: skill,
      percent: percent,
      createdAt: new Date()
    });

    event.target.skill.value =  '';
    event.target.percent.value =  '';
    },

   "submit .new-language": function (event) {
    event.preventDefault();

    var language = event.target.language.value;
    var percent = event.target.percent.value;

    Languages.insert({
      language: language,
      percent: percent,
      createdAt: new Date()
    });

      event.target.language.value =  '';
      event.target.percent.value =  '';
    },

  "submit .new-hobby": function (event) {
    event.preventDefault();

      var hobby = event.target.hobby.value;

      Hobbies.insert({
        hobby: hobby,
        createdAt: new Date()
      });

      event.target.hobby.value =  '';
    }
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
      Skills.remove(this._id);
    }
  });
  
  Template.skill.rendered = function() {

    var data = Template.instance().data;
      var newWidth = $('#skill_'+data._id).parent().width() * data.percent;
      $('#skill_'+data._id).animate({
        width: newWidth,
      }, 1000);

  }

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



Template.body.rendered = function(){
   if(Meteor.userId()){
    $('#headline.editable').editable({
      placement: "auto top",
      success: function(response, newValue) {
            var config = Configs.findOne({'key':'headline'});
            if(config==null){
              Configs.insert({key:'headline', value:newValue});
            }
            else{
              Configs.update(config._id,{$set:{value: newValue}});
            }
        }});
      
      $('#bio.editable').editable({
      placement: "auto top",
      success: function(response, newValue) {
            var config = Configs.findOne({'key':'bio'});
            if(config==null){
              Configs.insert({key:'bio', value:newValue});
            }
            else{
              Configs.update(config._id,{$set:{value: newValue}});
            }

            }}
        );

        $('#telefon.editable').editable({
            placement: "auto top",
            success: function(response, newValue) {
                    var config = Configs.findOne({'key':'telefon'});
                    if(config==null){
                      Configs.insert({key:'telefon', value:newValue});
                    }
                    else{
                      Configs.update(config._id,{$set:{value: newValue}});
                    }
            }}
          );

            $('#email.editable').editable({placement: "auto top",
                      success: function(response, newValue) {
                              var config = Configs.findOne({'key':'email'});
                              if(config==null){
                                Configs.insert({key:'email', value:newValue});
                              }
                              else{
                                Configs.update(config._id,{$set:{value: newValue}});
                              }
                      }}
            );

          $('#twitter.editable').editable({placement: "auto top",
              success: function(response, newValue) {
                      var config = Configs.findOne({'key':'twitter'});
                      if(config==null){
                        Configs.insert({key:'twitter', value:newValue});
                      }
                      else{
                        Configs.update(config._id,{$set:{value: newValue}});
                      }
              }}
            );

          $('#facebook.editable').editable({placement: "auto top",
              success: function(response, newValue) {
                      var config = Configs.findOne({'key':'facebook'});
                      if(config==null){
                        Configs.insert({key:'facebook', value:newValue});
                      }
                      else{
                        Configs.update(config._id,{$set:{value: newValue}});
                      }
              }}
          );

          $('#skype.editable').editable({placement: "auto top",
                    success: function(response, newValue) {
                            var config = Configs.findOne({'key':'skype'});
                            if(config==null){
                              Configs.insert({key:'skype', value:newValue});
                            }
                            else{
                              Configs.update(config._id,{$set:{value: newValue}});
                            }
                    }}
          );
      }//if user!

  };

}

if (Meteor.isServer){

  Meteor.users.deny({
    update: function() {
      // return true;
      (!adminUser(userId))
    }
  });

  function adminUser(userId) {  
  var adminUser = Meteor.users.findOne({ emails : { $elemMatch : { address:'nico@le-space.de' }}});
      return (userId && adminUser && userId === adminUser._id);
  }
  
  Educations.allow({
    insert: function(userId, doc){
      return adminUser(userId);
    },
    update: function(userId, docs, fields, modifier){
      return adminUser(userId);
    },
    remove: function (userId, docs){
      return adminUser(userId);
    }
  });

  Experiences.allow({
    insert: function(userId, doc){
      return adminUser(userId);
    },
    update: function(userId, docs, fields, modifier){
      return adminUser(userId);
    },
    remove: function (userId, docs){
      return adminUser(userId);
    }
  });

  Skills.allow({
    insert: function(userId, doc){
      return adminUser(userId);
    },
    update: function(userId, docs, fields, modifier){
      return adminUser(userId);
    },
    remove: function (userId, docs){
      return adminUser(userId);
    }
  });

  Languages.allow({
    insert: function(userId, doc){
      return adminUser(userId);
    },
    update: function(userId, docs, fields, modifier){
      return adminUser(userId);
    },
    remove: function (userId, docs){
      return adminUser(userId);
    }
  });

  Hobbies.allow({
    insert: function(userId, doc){
      return adminUser(userId);
    },
    update: function(userId, docs, fields, modifier){
      return adminUser(userId);
    },
    remove: function (userId, docs){
      return adminUser(userId);
    }
  });

  Configs.allow({
    insert: function(userId, doc){
      return adminUser(userId);
    },
    update: function(userId, docs, fields, modifier){
     // console.log('userId:'+userId+' docs:'+docs+' fields:'+fields+' modifier:'+modifier);
      return adminUser(userId);
    },
    remove: function (userId, docs){
      return adminUser(userId);
    }
  });

}