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
    console.log("creating guest")
    Meteor.call('createGuest', createGuestCB)


createGuestCB = (err, res) ->
  # have to create client side to login
  guest = Accounts.createUser(res)
  console.log("createGuest:", res)
