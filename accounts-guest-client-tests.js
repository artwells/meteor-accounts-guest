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
