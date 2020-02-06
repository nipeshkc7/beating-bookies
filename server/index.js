"use strict";

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const DB = require('./db/db');
const user_routes = require('./routes/user-routes');

// routes
//const oauth_route = require('./routes/oauth');
//const login_routes = require('./routes/login-routes');

//const db = new DB("sqlitedb")
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: "homepage"
    });
});

//setup oauth route
//app.use('/oauth', oauth_route);

//setup login routes

app.use('/user',user_routes);

// POST:: register user
// app.post('/register', function (req, res) {
//     db.insert([
//         req.body.name,
//         req.body.email,
//         bcrypt.hashSync(req.body.password, 8)
//     ],
//         function (err) {
//             if (err) return res.status(500).send("There was a problem registering the user.")
//             db.selectByEmail(req.body.email, (err, user) => {
//                 if (err) return res.status(500).send("There was a problem getting user")
//                 let token = jwt.sign({ id: user.id }, config.secret, {
//                     expiresIn: 86400 // expires in 24 hours
//                 });
//                 res.status(200).send({ auth: true, token: token, user: user });
//             });
//         });
// });

// app.post('/register-admin', function (req, res) {
//     db.insertAdmin([
//         req.body.name,
//         req.body.email,
//         bcrypt.hashSync(req.body.password, 8),
//         1
//     ],
//         function (err) {
//             if (err) return res.status(500).send("There was a problem registering the user.")
//             db.selectByEmail(req.body.email, (err, user) => {
//                 if (err) return res.status(500).send("There was a problem getting user")
//                 let token = jwt.sign({ id: user.id }, config.secret, {
//                     expiresIn: 86400 // expires in 24 hours
//                 });
//                 res.status(200).send({ auth: true, token: token, user: user });
//             });
//         });
// });

// app.post('/login', (req, res) => {
//     db.selectByEmail(req.body.email, (err, user) => {
//         if (err) return res.status(500).send('Error on the server.');
//         if (!user) return res.status(404).send('No user found.');
//         let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
//         if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
//         let token = jwt.sign({ id: user.id }, config.secret, {
//             expiresIn: 86400 // expires in 24 hours
//         });
//         res.status(200).send({ auth: true, token: token, user: user });
//     });
// })

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

module.exports = app;