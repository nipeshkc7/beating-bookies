"use strict";

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const user_routes = require('./routes/user-routes');
const bets_routes = require('./routes/bets-routes');
const blay_routes = require('./routes/blay-routes');
const d2w_routes = require('./routes/d2w-routes');
const d3w_routes = require('./routes/d3w-routes');
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: "homepage"
    });
});

//setup routes
app.use('/user', user_routes);
app.use('/bets', bets_routes);
app.use('/blay', blay_routes);
app.use('/d2w', d2w_routes);
app.use('/d3w', d3w_routes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

module.exports = app;