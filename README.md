Meteor Development Group has bought Kadira APM from Arunoda. We have made the original Kadira code available under the MIT License in this GitHub repository.

As the code we're running in Galaxy has diverged, we will not be running this repository as an open source project. We've started a conversation with potential maintainers of a community fork.

Arunoda uses the name Kadira for other projects and still owns the trademark on the "Kadira" name. Arunoda requests that public forks should choose a new name.

# Kadira APM

This is a set of components you need to run Kadira in your system.

> The following instructions are not production deployment configurations. It's meant for running for testing.

## Initial Setup

Open `init-shell.sh` and update configurations.
Make sure to set fresh DB configurations before getting started.

Then run following three components by visiting their directories:

* kadira-engine
* kadira-rma
* kadira-ui

## Connecting with Kadira Agent

You you are ready to connect your app into Kadira. Since we are running with a custom setup, you need to export following environment variable before using Kadira in your app:

```
export KADIRA_OPTIONS_ENDPOINT=http://localhost:11011
```

> Here's we've assumed http://localhost:11011 as the kadira-engine URL.


# Run Locally

Only 1 environment variable needed! `KADIRA_MONGO_URL`

1. Build Meteor - `cd kadira-ui && meteor build .`
2. Start server - `docker-compose up`
3. Navigate to `localhost:4000` - Kadira is ready. Engine is on port 11011

4. In order to login, create initial user. Just insert into Mongo, into `users` collection:

```json
{
    "_id": "TeNH2Hh4YMGuiCzRT",
    "createdAt": {
        "$date": "2017-05-17T11:23:57.992+0000"
    },
    "services": {
        "password": {
            "bcrypt": "$2a$10$Dj3hiRVBTgo31JLqEsjTd.iILAO3GmMtKSj6XIGXRNwsi5jDw.aF."
        }
    },
    "username": "SOMEUSER",
    "emails": [{
        "address": "user@gmail.com",
        "verified": false
    }],
    "states": {
        "__inited": 1.4950202511E12,
        "activated": 1.495022453102E12
    },
    "plan": "business"
}
```

This will set password `SOMEPASSWORD`. You can update it direcrly in mongo using this code:

```js
const crypto = require("crypto");
const bcrypt = require("bcrypt");

function getEncryptedPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  const hashedPassword = hash.digest('hex');
  return new Promise(resolve => bcrypt.hash(hashedPassword, 10, (e, r) => resolve(r)));
}

getEncryptedPassword('123456').then(console.log);
```
