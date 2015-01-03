Tinytest.add(
	'guest - account creation',
	function (test) {
		res = Meteor.call("createGuest");
		uid = Meteor.userId();
		test.isTrue((typeof uid !== undefined && typeof uid !== null), 'no userId returned');
	}
);
