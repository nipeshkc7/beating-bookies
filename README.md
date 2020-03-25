
![Beating Bookies Logo](client/public/logo.png)

## Overview

A free-to-use application made for matched-bettors. Used for tracking betting activities, profits along with matched-betting tools like dutching calculator, back-lay calculators. This application has support for Google Sign In and regular email sign in.

This is a completely API based backend using Node.js and front-end done using Vue.js.

To setup and run the application on your local machine, Follow these instructions:

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

DATABASE=
CLIENT_URL=

NODE_ENV =          // 'dev' or 'test' or 'prod'
``` 