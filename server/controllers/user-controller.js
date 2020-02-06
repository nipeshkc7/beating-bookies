"use strict";

const user_service = require('../services/user-service');
//const user_service = new user();
// function get_url_gauth(req, res) {
//     res.end(user_service.getConnectionUrl());
// }

// async function get_user_details(req, res, next) {
//     try {
//         const usr = await login_service.getUserDetails(req.query.code);
//         res.json(usr);
//     } catch (e) {
//         return next(e);
//     }
// }

function register(req, res) {
    user_service.addUser(req.body.name, req.body.email, req.body.password)
        .then((server_msg) => res.status(200).send(server_msg))
        .catch((er) => res.status(409).send(er));
}

async function login(req, res) {
    try {
        const authorization = await user_service.login(req.body.email, req.body.password);
        if (authorization == null)
            return res.status(401).send(authorization);
        return res.status(200).send(authorization);
    }
    catch (er) {
        console.log(er);
        return res.status(500).send('error on server' + er);
    }
}

function deleteAll(req, res) {
    try {
        user_service.deleteAll();
        return res.status(200).send("successfully deleted");
    } catch (er) {
        return res.status(500).send(er);
    }
}

function deleteById(req, res) {
    try {
        user_service.deleteById(req.body.id);
        return res.status(200).send("successfully deleted user");
    } catch (er) {
        return res.status(500).send(er);
    }
}

async function getUserById(req, res) {
    try {
        let user = await user_service.getUserById(req.body.id);
        if (user)
            return res.status(200).send(user);
        return res.status(404).send("NOT FOUND");
    } catch (er) {
        return res.status(500).send(er);
    }
}

function getAll(req, res) {
    try {
        let users = user_service.getAll();
        if (users)
            return res.status(200).send(users);
        res.status(404).send("nothing found");
    } catch (er) {
        console.log(er);
        return res.status(500).send(er);
    }
}

module.exports = {
    login,
    register,
    deleteAll,
    getUserById,
    getAll,
    deleteById,
};
