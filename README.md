
![Beating Bookies Logo](client/public/logo.png)

## Overview

A free-to-use application made for matched-bettors. Used for tracking betting activities, profits along with matched-betting tools like dutching calculator, back-lay calculators. This application has support for Google Sign In and regular email sign in.

This is a completely API based backend using Node.js and front-end done using Vue.js.

## Motivation

Matched-betting has been around for some time now and is quite popular in the UK with different services like odds-monkey providing people with tools to make Matched betting feasible for the average bettor. With growing number of Australians learning about this risk free betting technique, people are looking into services like odds-monkey but more relevant to the Aussie market. This led to a surge in popularity in platforms like BonusBank which gives out daily plays and a variety of toolset to make the process more efficient. However these services do not provide cloud-based storage for tracking and updating user's matched-betting activities.

Beating Bookies addresses these shortcomings by providing a free to use tracker that tracks user's bets, their profits and provides an interactive dashboard to see betting-related statistics. Additionally it provides calculators for placing different kinds of bets including back/lay bets, Dutch 2 way bets, Dutch 3 way bets.

## Developer Setup

To setup and run the application on your local machine, Follow these instructions:

- Fork this repository, and cd into it.

```bash
git clone https://github.com/nipeshkc7/matched-betting-tracker.git
cd matched-betting-tracker/
```

### Server setup and run

Cd into server, install dependencies.

```
cd server
npm install
```

Create a sqlite database (inside server):

```
npm run setup_db_dev
```

Start server:

```
npm run dev
```

### Client setup and run

Cd into client, install dependencies and run 'serve' script

```
cd client
npm install
npm run serve
```

### Run tests

API level tests are done using Mocha and Chai. Located inside 'server' (so cd into server first)

Setup a test database using the following script:

```
npm run setup_db_test
```

Start tests:

```
cd server
npm test
```

### Required environment variables

Recommended you have a .env file inside the root folder with the following variables for the server environment:
```
GOOGLE_CLIENT_ID= 
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URL=

DATABASE=
CLIENT_URL=

NODE_ENV =          // 'dev' or 'test' or 'prod'
``` 

You will also need the following environment variables in the vue environment:
```
VUE_APP_SERVER_URL = 
```