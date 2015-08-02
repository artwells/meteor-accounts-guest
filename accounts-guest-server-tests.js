
Tinytest.add(
  'guest - remove guests',
  function (test) {
      AccountsGuest.anonymous = false;
	  var before = new Date();
	  before.setHours(before.getHours() - 100000);
		Meteor.call('createGuest');
		var username = Meteor.uuid();
		Accounts.createUser({password: Meteor.uuid(), username: username, profile: {guest: true, name: 'Guest'}});
		Meteor.users.update({username: username},{$set: {createdAt: before}});
		usr = Meteor.users.findOne({username: username});
		test.isFalse((typeof usr === 'undefined'), 'guest account not defined');

		before.setHours(before.getHours() + 1);
		res = Accounts.removeOldGuests(before);
		test.equal(res, 1, 'should exactly one deleted');

		usr = Meteor.users.findOne({username: username});
		test.isTrue((typeof usr === 'undefined'), 'guest account not deleted');}
 );

 Tinytest.add(
     'guest - remove anonymous guests',
     function (test) {
         AccountsGuest.anonymous = true;
         var before = new Date();
         before.setHours(before.getHours() - 100000);
         var connection = DDP.connect(Meteor.absoluteUrl());
         connection.call('login', {createGuest: true});
         var usr = Meteor.users.findOne({'profile.guest': true});
         oldUserId = usr._id;
         Meteor.users.update({_id: oldUserId},{$set: {createdAt: before}});
         usr = Meteor.users.findOne({_id: oldUserId});
         test.isFalse((typeof usr === 'undefined'), 'guest account not defined');

         before.setHours(before.getHours() + 1);
         res = Accounts.removeOldGuests(before);
         test.equal(res, 1, 'should exactly one deleted');

         usr = Meteor.users.findOne({_id: oldUserId});
         test.isTrue((typeof usr === 'undefined'), 'guest account not deleted');}
     );
