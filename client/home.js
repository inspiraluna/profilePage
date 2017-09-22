
Template.home.helpers({
     headline: function () {
        var config = Configs.findOne({'key':'headline'});
         return config?config.value:'';
     },
     bio: function () {
         var config = Configs.findOne({'key':'bio'});
         return config?config.value:'';
     },
     serviceIntro: function () {
         var config = Configs.findOne({'key':'serviceIntro'});
         return config?config.value:'';
     },
     fullname: function () {
         var config = Configs.findOne({'key':'fullname'}); 
        return (config==null)?'':config.value;
     },
     birthday: function () {
         var config = Configs.findOne({'key':'birthday'}); 
        return (config==null)?'':config.value;
     },
     address: function () {
         var config = Configs.findOne({'key':'address'}); 
        return (config==null)?'':config.value;
     },
     telefon: function () {
         var config = Configs.findOne({'key':'telefon'}); 
        return (config==null)?'':config.value;
     },
     email: function () {
         var config = Configs.findOne({'key':'email'}); 
         return (config==null)?'':config.value;
     },
     website: function () {
         var config = Configs.findOne({'key':'website'}); 
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
      var showTravels = (Session.get('travel')!==null);    
      return Experiences.find({trip: {"$exists":showTravels}},{sort: {year: -1}});
     },
     travel: function () {
         return Session.get('travel');
     },
     languages: function () {
         return Languages.find({},{sort: {language: 1}});
     },
     hobbies: function () {
         return Hobbies.find({},{sort: {hobby: 1}});
     }
  }); 

   //Languages
  Template.home.events({

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
