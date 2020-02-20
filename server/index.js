"use strict";

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const user_routes = require('./routes/user-routes');
const authorize = require('./util/authorize');
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({
        message: "homepage"
    });
});

//setup user routes

app.use('/user',user_routes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

module.exports = app;