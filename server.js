if (Meteor.isServer){

    /*
    var access_token ="AQUwrecWQQRcoNNIWJVTAHZ3Kij86FbJ8mPxL7BkR0UEXnU5mNOAcskzm629A4z4J9m59Vk3Po3U18dZBV4ivs4lICFGE9K0E2dCit_xN8Z3M0i_aWmdp8-LF11vdBWhN0d4ocundnKNrCVsYFkVGQenE7TxdTKCLQ-wm9HIWw0vxmxenQvpcTXedBX6-ybrGTXK8mP1xiUgOWRzkRh9XVlspneXHo4tIUpKXS5i37CPlyE5R55D9cdz7oceQl-tct4_p40ZpOvfZwdJh8jwy-NBsSI7aKA_a3PGX1E3mQx-xLv7MNU1LqegLhbwaXGKSzVniaPShPQhKHjA6CHdEGmPC3ZIiQ";

    var linkedin = Linkedin().init(access_token, {
        timeout: 10000
    });

    linkedin.people.me(function(err, lin) {
        // Loads the profile of access token owner.
        console.log('linked-in:'+JSON.stringify(lin));
    });
    */

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
