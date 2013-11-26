Tinytest.add(
	'guest - account creation',
	function (test) {
		res = Meteor.createGuest();
		console.log(res + 'ko');
		uid = Meteor.userId();
		test.isTrue((typeof uid !== undefined && typeof uid !== null), 'no userId returned');
	}
);
