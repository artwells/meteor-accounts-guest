AccountsGuest = {};
if (typeof AccountsGuest.forced === "undefined") {
	AccountsGuest.forced = true; /*default to making loginVisitor automatic, and on logout*/
}
if (typeof AccountsGuest.enabled === "undefined") {
	AccountsGuest.enabled = true; /* on 'false'  Meteor.loginVisitor() will fail */
}
