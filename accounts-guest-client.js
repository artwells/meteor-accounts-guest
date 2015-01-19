/*****************
* special anonymous behavior so that visitors can
* manipulate their work
*
*/


// If our app has a Blaze, override the {{currentUser}} helper to deal guest logins
if (Package.blaze) {
  /**
   * @global
   * @name  currentUser
   * @isHelper true
   * @summary Calls [Meteor.user()](#meteor_user). Use `{{#if currentUser}}` to check whether the user is logged in.
   * Where "logged in" means: The user has has authenticated (e.g. through providing credentials)
   */
  Package.blaze.Blaze.Template.registerHelper('currentUser', function () {
    var user = Meteor.user();
    if (user &&
        typeof user.profile !== 'undefined' &&
        typeof user.profile.guest !== 'undefined' &&
        user.profile.guest){
        // a guest login is not a real login where the user is authenticated. 
        // This allows the account-base "Sign-in" to still appear
      return null;
    }else{
      return Meteor.user();
    }
  });
}


	//no non-logged in users
	/* you might need to limit this to avoid flooding the user db */
	Meteor.loginVisitor = function (email) {
		AccountsGuest.forced = true;
		if (!Meteor.userId()) {
			Meteor.call('createGuest', email, function (error, result) {
				if (error) {
					console.log('Error in creating Guest ' + error);
					return false;
				}
				/* if a simple "true" is returned, we are in a disabled mode */
				if(result === true){
					return true;
				}
				Meteor.loginWithPassword(result.email, result.password, function(err){
					if(err){
						console.log('Error logging in '+err);
						return false;
					}
				});
				return true;
			});
		}
	}

Meteor.startup(function(){
		Deps.autorun(function () {

			if (Meteor.userId()) {
				//			console.log('this is '+Meteor.userId());
			} else {
				if (AccountsGuest.forced === true){
					Meteor.loginVisitor();
				}
			}
		});
});
