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
    /* if explicitly disabled, happily do nothing */
    if (AccountsGuest.enabled === false){
      return true;
    }

    count = Meteor.users.find().count() + 1
    guestname = "guest-#" + count

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
