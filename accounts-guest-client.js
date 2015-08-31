/*****************
 * special anonymous behavior so that visitors can
 * manipulate their work
 *
 */

Meteor.loginVisitor = function (email, callback) {
    if (!Meteor.userId()) {
        Accounts.callLoginMethod({
            methodArguments: [{
                email: email,
                createGuest: true
            }],
            userCallback: function (error, result) {
                if(error) {
                    callback && callback(error);
                } else {
                    callback && callback();
                }
            }
        });
    }
}

//no non-logged in users
/* you might need to limit this to avoid flooding the user db */
Meteor.startup(function(){
    Deps.autorun(function () {
        if (!Meteor.userId()) {
            if (AccountsGuest.forced === true) {
                Meteor.loginVisitor();
            }
        }
    });
});
