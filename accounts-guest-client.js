/*****************
* special anonymous behavior so that visitors can 
* manipulate their work 
* 
*/
Meteor.createGuest = function (fn) {
  res = Accounts.createUser({
    password: Meteor.uuid(),
    username: Meteor.uuid(),
    guest: true
    // email: "guest@xgram.org",
    // name: Meteor.uuid(),
    // email: Meteor.uuid(),
    // profile: {guest: "guest", name: 'Guest'},
    // roles: ['admin']
  });
  console.log("createGuest:", res);
};


/* make anonymous users kinda non-users -- just ids 
* this allows the account-base "Sign-in" to still appear
*/

// Meteor.user = function () {
//   var userId = Meteor.userId();
//   if (!userId) {
//     return null;
//   }
//   var user = Meteor.users.findOne(userId);
//   if (user !== undefined &&
//       user.profile !== undefined &&
//       user.profile.guest) {
//     return null;
//   }
//   return user;
// };


//no non-logged in users
/* you might need to limit this to avoid flooding the user db */

Meteor.loginVisitor = function () {
	if (!this.userId()) {
    console.log("creating guest")
	  Meteor.createGuest();
	}
  console.log("skippinh guest")
}

Meteor.startup(function() {
  Meteor.loginVisitor()
});