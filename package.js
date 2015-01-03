Package.describe({
	summary: "Automatically add visitor as anonymous guest with userId",
	version: "0.1.2",
	name: "artwells:accounts-guest",
	git: "https://github.com/artwells/meteor-accounts-guest.git"
});

Package.onUse(function (api) {
	api.versionsFrom("METEOR@0.9.0");
	api.use(['accounts-base@1.1.3', 'accounts-password@1.0.5'], 'client');
	api.use(['accounts-base@1.1.3'], 'server');
	api.add_files('accounts-guest-server.js', 'server');
	api.add_files('accounts-guest-client.js', 'client');
});

Package.onTest(function (api) {
	api.versionsFrom("METEOR@0.9.0");
	api.use(['accounts-base@1.1.3', 'accounts-password@1.0.5', 'tinytest@1.0.3'], ['client','server']);
	api.add_files('accounts-guest-client.js', ['client','server']);
	api.add_files('accounts-guest-server.js', 'server');
	api.add_files('accounts-guest-client-tests.js', 'client');
	api.add_files('accounts-guest-server-tests.js', 'server');
});
