meteor-queue
============

Automatically add visitor as anonymous guest with userId

##Features
- each non-logged in visitor gets a userId, accessible via Accounts and Meteor:userId()
- includes configurable cleanup function


##Installation
```sh
mrt add accounts-base
mrt add accounts-password
mrt add accounts-guest
```

then in client-only code
```javascript
Meteor.loginVisitor()
```


optionally (to clean out old guest accounts) in server-only code
```javascript
Meteor.loginVisitor();
```

Now Meteor.userId() will be populated for each new visitor, including across reloads




##Options

none yet

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
Accounts.removeOldGuests();
```

##TODO
- Tests
- Make it possible to disable and call conditionally
- Allow guest session merged into new session if a visitor logs in
- Optionally force guest account when a user logs out/losses session



