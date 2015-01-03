/*****************
* special anonymous behavior so that visitors can
* manipulate their work
*
*/

/* make anonymous users kinda non-users -- just ids
* this allows the account-base "Sign-in" to still appear
*/
Meteor.user = function () {
	var userId = Meteor.userId();
	if (!userId) {
		return null;
	}
	var user = Meteor.users.findOne(userId);
	if (user !== undefined &&
		user.profile !== undefined &&
		user.profile.guest) {
			return null;
		}
		return user;
	};


	//no non-logged in users
	/* you might need to limit this to avoid flooding the user db */
	Meteor.loginVisitor = function () {
		if (!Meteor.userId()) {
			Meteor.call('createGuest',function (error, result) {
				if (error) {
					console.log('Error in creating Guest ' + error);
					return false;
				}
				console.log("guest " + result.email + result.password);
				Meteor.loginWithPassword(result.email, result.password, function(err){
					if(err){
						console.log('Error logging in '+err);
						return false;
					}
				});
				//		  console.log("guest " + Meteor.user());

				return true;
			});
		}
	}
