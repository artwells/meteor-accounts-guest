accounts-guest
============

Automatically add visitor as anonymous guest with userId

##Features
- each non-logged in visitor gets a userId, accessible via Accounts and Meteor:userId()
- includes configurable cleanup function


##Installation
```sh
meteor add accounts-base
meteor add accounts-password
meteor add accounts-guest
```
and you are done!

If you've changed AccountsGuest.forced to false, in client-only code add0

```javascript
Meteor.loginVisitor()
```


optionally (to clean out old guest accounts) in server-only code
```javascript
Accounts.removeOldGuests([time before]);
```

Now Meteor.userId() will be populated for each new visitor, including across reloads




##Options

* `AccountsGuest.enabled`,  default true. enables "Meteor.loginVisitor()".
* `AccountsGuest.forced`,  default true. Does not require "Meteor.loginVisitor()". Will force recently logged out accounts into guest mode.

##Examples

```javascript
/* clean out all guest accounts more than 24 hours old (default behavior) */
Accounts.removeOldGuests();
```
or

```javascript
/* clean out all guest accounts more than 2 hours old */
var before = new Date();
before.setHours(before.getHours() - 2);
Accounts.removeOldGuests(before);
```

##TODO
- tests for forced, and enabled options
- Allow guest session merged into new session if a visitor logs in
- Allow merged session/other variables to be specified in config
