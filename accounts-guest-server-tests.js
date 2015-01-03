
Tinytest.add(
  'guest - remove guests',
  function (test) {
	  var before = new Date();
	  before.setHours(before.getHours() - 100000);
		Meteor.call('createGuest');
		var username = Meteor.uuid();
		Accounts.createUser({password: Meteor.uuid(), username: username, profile: {guest: "guest", name: 'Guest'}});
		Meteor.users.update({username: username},{$set: {createdAt: before}});
		usr = Meteor.users.findOne({username: username});
		test.isFalse((typeof usr === 'undefined'), 'guest account not defined');
		before.setHours(before.getHours() + 1);
		res = Accounts.removeOldGuests(before);
		test.equal(res, 1, 'should exactly one deleted');
		usr = Meteor.users.findOne({username: username});
		test.isTrue((typeof usr === 'undefined'), 'guest account not deleted');}
 );
