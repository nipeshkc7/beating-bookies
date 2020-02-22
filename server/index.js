"use strict";

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { handleError } = require('./util/error');
const user_routes = require('./routes/user-routes');
const bets_routes = require('./routes/bets-routes');
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: "homepage"
    });
});

//setup user and bets routes
app.use('/user', user_routes);
app.use('/bets', bets_routes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

module.exports = app;