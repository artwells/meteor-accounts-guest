
Accounts.removeOldGuests = (before) ->
  if (typeof before == 'undefined')
    before = new Date()
    before.setHours(before.getHours() - 1)
  
  res = Meteor.users.remove(
    {
      createdAt: {$lte: before},
      'profile.guest': true
    }
  )
  return res


Meteor.methods
  'createGuest': ->
    count = Meteor.users.find().count() + 1
    guestname = "guest-#{count}"
    guest = {
      username: guestname
      email: "#{guestname}@xgram.org"
      profile: {guest: true}
      password: Meteor.uuid()
    }
    # Accounts.createUser(guest)
    console.log("createGuest", guest)
    return guest
