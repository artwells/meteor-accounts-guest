Tinytest.add(
	'guest - account creation',
	function (test) {
		res = Meteor.call("createGuest");
		uid = Meteor.userId();
		test.isTrue((typeof uid !== undefined && typeof uid !== null), 'no userId returned');
	}
);
/*
Tinytest.addAsync(
	'guest - guest after logout',
	function (test,next) {
		Meteor.loginWithPassword(AccountsGuest.testname, AccountsGuest.testpass, function(err){
			if(err){
				console.log('Error logging in '+err);
				return false;
			}
		});
		userid = Meteor.userId();
		test.isTrue(typeof userid !== undefined, 'no userId returned');
		test.isTrue(userid != 'null', 'no userId returned');
		Meteor.logout(function(err){
			if(err){
				console.log('Error logging out '+err);
				return false;
			}
			seconduid = Meteor.userId();
			test.isNotNull(seconduid, 'uid null');
			test.notEqual(userid, seconduid, 'new uid issued');
			console.log(seconduid + uid +'uuuu');
		});

		next();

	});

*/



Tinytest.add(
	'guest - test disable',
	function (test) {
		AccountsGuest.enabled = false;
		res = Meteor.call("createGuest");
		uid = Meteor.userId();
		test.isTrue((typeof uid !== undefined && typeof uid !== null), 'working');
	}
);

Tinytest.add('guest - currentUser', function (test) {
  // Define a template that looks up currentUser and tests it
  var template = new Blaze.Template("test", function() {
    var view = this;
    var actualCurrentUser = view.lookup("currentUser")();
    test.equal(actualCurrentUser, expectedCurrentUser);
    return Spacebars.mustache(actualCurrentUser); // We don't need the output
  });

  // Stub Meteor.user
  var origMeteorUser = Meteor.user;
  Meteor.user = function() {
    return user;
  }

  // Create a user object for our stub to return.
  var user = {
    emails: [ {address: true} ], // not a string
    username: true, // not a string
    profile: {
      name: true // not a string
    },
		services: { } // Empty when autopublish package is not installed
  };
  var expectedCurrentUser = user;

	// Test a marginally anonymous user.
  expectedCurrentUser = null;
  Blaze.toHTML(template);

  // Test non-anonymous users
  expectedCurrentUser = user;

  // Test a non-anonymous user with only a profile.name
  delete user.emails;
  delete user.username;
  user.profile.name = 'Test User';
  Blaze.toHTML(template);

  // Test a non-anonymous user with only an email address
  delete user.profile;
  user.emails = [ { address: 'test@example.com' }];
  Blaze.toHTML(template);

  // Test a non-anonymous user with only a username
  delete user.emails;
  user.username = 'testuser';
  Blaze.toHTML(template);

	// Test an explicit guest user
  delete user.username;
  user.profile = { guest: true };
	expectedCurrentUser = null;
  Blaze.toHTML(template);

  // Unstub Meteor.user
  Meteor.user = origMeteorUser;
});
