

Educations = new Mongo.Collection("educations");
Experiences = new Mongo.Collection("experiences");
Skills = new Mongo.Collection("skills");
Languages = new Mongo.Collection("languages");
Hobbies = new Mongo.Collection("hobbies");
Configs = new Mongo.Collection("configs");



if (Meteor.isClient) {

    Template.body.rendered= function(){
            $('head').append('<script src="https://holartc.com/holartc.js">');
    }

  Template.body.helpers({

      options: function (parentContext) {

        var config = Configs.findOne({'key':parentContext.hash.field});
        console.log();
        return {
          type: 'textarea',
          async: true,
          position: 'right',
          value: config?config.value:'no '+parentContext.hash.field,
          onsubmit: function (val, cb) {
            // setTimeout(function () {
                // Session.set('text', val);

                var config = Configs.findOne({'key':parentContext.hash.field});

                if(config==null){
                  Configs.insert({key:parentContext.hash.field, value:val});
                }
                else{
                  Configs.update(config._id,{$set:{value: val}});
                }
              cb();
            // }, 1000);
          }
        };
      },
     headline: function () {
        var config = Configs.findOne({'key':'headline'});
         return config?config.value:'';
     },
     bio: function () {
         var config = Configs.findOne({'key':'bio'});
         return config?config.value:'';
     },
     telefon: function () {
         var config = Configs.findOne({'key':'telefon'});
        return (config==null)?'':config.value;
     },
     email: function () {
         var config = Configs.findOne({'key':'email'});
         return (config==null)?'':config.value;
     },
     twitter: function () {
         var config = Configs.findOne({'key':'twitter'});
        return (config==null)?'':config.value;
     },
     github: function () {
         var config = Configs.findOne({'key':'github'});
        return (config==null)?'':config.value;
     },
     facebook: function () {
         var config = Configs.findOne({'key':'facebook'});
         return (config==null)?'':config.value;
     },
     skype: function () {
         var config = Configs.findOne({'key':'skype'});
         return (config==null)?'':config.value;
     },
     educations: function () {
         return Educations.find({},{sort: {year: -1}});
     },
     experiences: function () {

      var showTravels = (Session.get('travel')!=null);
      console.log(showTravels);

      if(showTravels)
        return Experiences.find({ "trip": true},{sort: {year: -1}});
      else
        return Experiences.find({$or:[{trip:false},{trip:{$exists:false}}]},{sort: {year: -1}});

     },
     travel: function () {
         return Session.get('travel');
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

  Template.body.events({

    "click .travel": function (event) {
      event.preventDefault();
      console.log(Session.get('travel'));
      if(Session.get('travel')) Session.set('travel',null);
      else Session.set('travel','green');
    },

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
      var trip = event.target.trip.checked;

      Experiences.insert({
        year: year,
        company: company,
        headline: headline,
        story: story,
        trip: trip,
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

}

