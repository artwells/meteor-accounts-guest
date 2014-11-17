Package.describe({
  name: 'dcsan:accounts-guest',
  summary: "Automatically add visitor as anonymous guest with userId",
  version: "0.1.2",
  git: "https://github.com/dcsan/meteor-accounts-guest.git",
  comment: "updated to 1.0"
});

Package.on_use(function (api) {
  api.versionsFrom("METEOR@1.0");
  api.use(['accounts-base', 'accounts-password'], 'client');
  api.use(['accounts-base'], 'server');
  api.add_files('accounts-guest-server.js', 'server');
  api.add_files('accounts-guest-client.js', 'client');
});

Package.on_test(function (api) {
  api.use(['accounts-base', 'accounts-password', 'tinytest'], ['client','server']);
  api.add_files('accounts-guest-client.js', ['client','server']);
  api.add_files('accounts-guest-server.js', 'server');
  api.add_files('accounts-guest-client-tests.js', 'client');
  api.add_files('accounts-guest-server-tests.js', 'server');
});
