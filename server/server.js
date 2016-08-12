
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