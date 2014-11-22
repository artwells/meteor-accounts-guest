Accounts.removeOldGuests = function (before) {
  if (typeof before === 'undefined') {
    before = new Date();
    before.setHours(before.getHours() - 1);
  }
  res = Meteor.users.remove({createdAt: {$lte: before}, 'profile.guest': 'guest'});
  return res;
};

Meteor.methods
 'createGuest': ->
    count = Meteor.users.find().count()

    guest = {
      username: "guest.#{count}"
      email = "#{guestname}@xgram.org"
      roles = ['admin']
    }

    return guest
