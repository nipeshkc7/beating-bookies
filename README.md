## Project Overview

This is a matched-betting-tracker application for tracking user's matched betting activities, has support for Oauth 2.0 authentication.

# Server setup

```
cd server
npm install
```

# Client setup

```
cd client
npm install
```

### Run server

```
cd server
npm run dev
```

### Run client

```
cd client
npm run serve
```

API level tests are done using Mocha and Chai. 

### Run tests

```
npm test
```


# Required environment variables

Recommended you have a .env file inside the root folder with the following variables:
```
GOOGLE_CLIENT_ID= 
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URL=

DATABASE=           //name of the database
CLIENT_URL=
```

NODE_ENV =      // 'dev' or 'test' or 'prod'


### TODO:

1. Apply a front end library
2. Create database schema
3. Add CRUD features for the new database tables