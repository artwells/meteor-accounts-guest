Package.describe({
    summary: "Automatically add visitor as anonymous guest with userId",
    version: "0.1.12",
    name: "artwells:accounts-guest",
    git: "https://github.com/artwells/meteor-accounts-guest.git"
});

Package.onUse(function (api) {
    api.versionsFrom("METEOR@0.9.0");
    api.use(['accounts-base', 'deps', 'blaze@2.0.4'], 'client');
    api.use(['accounts-base'], 'server');
     // accounts-password is only required if you want to pass an email to Accounts.loginVisitor()
    api.use('accounts-password', 'server', { weak: true });
    api.use('underscore', 'server');
    api.add_files('accounts-guest.js', ['client','server']);
    api.export('AccountsGuest');
    api.add_files('accounts-guest-server.js', 'server');
    api.add_files('accounts-guest-client.js', 'client');

});

Package.onTest(function (api) {
    api.versionsFrom("METEOR@0.9.0");
    api.use(['accounts-base', 'accounts-password', 'tinytest','deps'], ['client','server']);
    api.add_files('accounts-guest.js', ['client','server']);
    api.add_files('accounts-guest-server.js', 'server');
    api.add_files('accounts-guest-client.js', 'client');
    api.add_files('accounts-guest-server-tests.js', 'server');
    api.add_files('accounts-guest-client-tests.js', 'client');
});

Npm.depends({
    'moniker': '0.1.2'
});
