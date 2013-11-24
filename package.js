Package.describe({
  summary: "Automatically add visitor as anonymous guest with userId"
});

Package.on_use(function (api) {
  api.use(['accounts-base', 'accounts-password'], 'client');
  api.use(['accounts-base'], 'server');
  api.add_files('accounts-guest-server.js', 'server');
  api.add_files('accounts-guest-client.js', 'client');
});

Package.on_test(function (api) {
});
