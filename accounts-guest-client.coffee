## special anonymous behavior so that visitors can proceed

# // Meteor.user = function () {
# //   var userId = Meteor.userId();
# //   if (!userId) {
# //     return null;
# //   }
# //   var user = Meteor.users.findOne(userId);
# //   if (user !== undefined &&
# //       user.profile !== undefined &&
# //       user.profile.guest) {
# //     return null;
# //   }
# //   return user;
# // };


# //no non-logged in users
# /* you might need to limit this to avoid flooding the user db */

Meteor.startup ->
  Meteor.loginVisitor()

Meteor.loginVisitor = () ->
  if (!this.userId())
    console.log("guest | creating guest")
    Meteor.call('createGuest', loginGuestCB)


loginGuestCB = (err, user) ->
  # guest = Accounts.createUser(res)
  Meteor.loginWithPassword(user.username, user.password)
  console.log("guest | loginGuestCB:", user)
