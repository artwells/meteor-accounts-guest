Package.describe({
    summary: "Automatically add visitor as anonymous guest with userId",
    version: "0.1.16",
    name: "baursn:accounts-guest",
    git: "https://github.com/baursn/meteor-accounts-guest.git"
});

Package.onUse(function (api) {
    api.versionsFrom("METEOR@1.6.1");
    api.use(['accounts-base','deps', 'blaze@2.0.4'], 'client');
    api.use(['accounts-base', 'mongo@1.1.0', 'check', 'random'], 'server');
    api.use('accounts-password', 'server', { weak: true });
    api.use('underscore', 'server');
    api.use('brettle:accounts-patch-ui@0.0.1');
    api.use('brettle:accounts-login-state@0.0.1');
    api.use('brettle:accounts-add-service@0.3.0', ['client', 'server'], { weak: true });
    api.use('brettle:accounts-multiple@0.3.0', ['client', 'server'], { weak: true });
    api.add_files('accounts-guest.js', ['client','server']);
    api.export('AccountsGuest');
    api.add_files('accounts-guest-server.js', 'server');
    api.add_files('accounts-guest-client.js', 'client');

});

Package.onTest(function (api) {
    api.versionsFrom("METEOR@1.6.1");
    api.use(['accounts-base', 'accounts-password', 'mongo', 'tinytest','deps','ddp'], ['client','server']);
    api.use('baursn:accounts-guest');
    api.add_files('accounts-guest-server-tests.js', 'server');
    api.add_files('accounts-guest-client-tests.js', 'client');
});

Npm.depends({
    'moniker': '0.1.2'
});
