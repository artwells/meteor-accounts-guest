Moniker = Npm.require('moniker');

Accounts.removeOldGuests = function (before) {
    if (typeof before === 'undefined') {
        before = new Date();
        before.setHours(before.getHours() - 1);
    }
    res = Meteor.users.remove({createdAt: {$lte: before}, 'profile.guest': true});
    return res;
};
Accounts.registerLoginHandler("guest", function (options) {
    if (AccountsGuest.enabled === false || !options || !options.createGuest || Meteor.userId())
        return undefined;

    var newUserId = null;

    if (AccountsGuest.anonymous) {
        if (options.email) {
            throw new Error("Can't create a guest user with an email with AccountsGuest.anonymous == true.\n");
        }
        newUserId = Accounts.insertUserDoc(options, {profile: {guest: true}});
    } else if (!Accounts.createUser) {
        throw new Error("Can't create a guest user with falsey AccountsGuest.anonymous unless the accounts-password package is installed.\n" +
            "Either set AccountsGuest.anonymous or run 'meteor add accounts-password'.");
    } else {
        var guestOptions = createGuestOptions(options.email);

        newUserId = Accounts.createUser(guestOptions);
    }
    return {
        userId: newUserId
    };
});

/**
 *  drop guest when visitor logs in
 *
 */
GuestUsers = new Mongo.Collection('guestUsers');
Accounts.onLogin(function(par){
    if(par.user.username.indexOf('guest') !== -1){
        if(!GuestUsers.findOne({connection_id: par.connection.id})){
            GuestUsers.insert({connection_id: par.connection.id, user_id: par.user._id});
        }
    }
    else if(par.type !== 'resume'){
        var guest = GuestUsers.findOne({connection_id: par.connection.id});
        Meteor.users.remove(guest.user_id);
        GuestUsers.remove(guest._id);
    }
});

/* adapted from pull-request https://github.com/dcsan
* See https://github.com/artwells/meteor-accounts-guest/commit/28cbbf0eca2d80f78925ac619abf53d0769c0d9d
*/
Meteor.methods({
    createGuest: function (email)
    {
        var guest = createGuestOptions(email);
        Accounts.createUser(guest);
        //    console.log("createGuest" + guestname);
        return guest;
    }
});


function createGuestOptions(email) {
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

        if (!email) {
            email = guestname + "@example.com";
        }

        guest = {
            username: guestname,
            email: email,
            profile: {guest: true},
            password: Meteor.uuid(),
        };
        return guest;
}
