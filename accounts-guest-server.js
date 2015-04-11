Moniker = Npm.require('moniker');

Accounts.removeOldGuests = function (before) {
    if (typeof before === 'undefined') {
        before = new Date();
        before.setHours(before.getHours() - 1);
    }
    res = Meteor.users.remove({createdAt: {$lte: before}, 'profile.guest': 'guest'});
    return res;
};

/* adapted from pull-request https://github.com/dcsan
* See https://github.com/artwells/meteor-accounts-guest/commit/28cbbf0eca2d80f78925ac619abf53d0769c0d9d
*/
Meteor.methods({
    createGuest: function (email)
    {
        check(email, Match.OneOf(String, null, undefined));
        
        /* if explicitly disabled, happily do nothing */
        if (AccountsGuest.enabled === false){
            return true;
        }

        //    count = Meteor.users.find().count() + 1
        if (AccountsGuest.name === true) {
          guestname = Moniker.choose();
          // Just in case, let's make sure this name isn't taken
          while (Meteor.users.find({username:guestname}).count() > 0) {
            guestname = Moniker.choose();
          }
        } else {
          guestname = "guest-#" + Random.id()
        }
        console.log("Using username: " + guestname);

        if (!email) {
            email = guestname + "@example.com";
        }

        guest = {
            username: guestname,
            email: email,
            profile: {guest: true},
            password: Meteor.uuid(),
        };
        Accounts.createUser(guest);
        //    console.log("createGuest" + guestname);
        return guest;
    }
});
