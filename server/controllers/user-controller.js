"use strict";

const user_service = require('../services/user-service');
const google = require('../util/google-util');

async function get_url_gauth(req, res) {
    let url = await google.getConnectionUrl();
    res.json({ url: url });
}

async function get_user_details(req, res, next) {
    try {
        const usr = await google.getUserDetails(req.query.code);
        res.json(usr);
    } catch (e) {
        return next(e);
    }
}

async function google_login(req, res) {
    try {
        const usr = await google.getUserDetails(req.body.code);
        if (usr.data.verified_email == true) {
            let authorization = await user_service.loginOauth(usr.data.email);
            res.status(200).json(authorization);
        }
        else {
            res.status(500).end("Cannot update user details");
        }
    } catch (er) {
        console.log(er);
    }
}

async function update_user(req, res) {
    try {
        let update_status = await user_service.update_user(req.body.old_email, req.body.new_name, req.body.new_email, req.body.new_password);
        if (!update_status)
            return res.status(500).send("Cannot update user details");
        return res.status(200).end("Ok");
    } catch (er) {
        console.log(er);
        return res.status(500).end("Cannot update user details");
    }
}

function register(req, res) {
    user_service.addUser(req.body.name, req.body.email, req.body.password)
        .then((server_msg) => res.status(200).json(server_msg))
        .catch((er) => res.status(409).json(er));
}

async function login(req, res) {
    try {
        const authorization = await user_service.login(req.body.email, req.body.password);
        if (authorization == null)
            return res.status(401).json(authorization);
        return res.status(200).json(authorization);
    }
    catch (er) {
        console.log(er);
        return res.status(500).json('ERROR' + er);
    }
}

function deleteAll(req, res) {
    try {
        user_service.deleteAll();
        return res.status(200).json("OK");
    } catch (er) {
        return res.status(500).json(er);
    }
}

function deleteById(req, res) {
    try {
        user_service.deleteById(req.body.id);
        return res.status(200).json("OK");
    } catch (er) {
        return res.status(500).json(er);
    }
}

async function getUserById(req, res) {
    try {
        let user = await user_service.getUserById(req.body.id);
        if (user)
            return res.status(200).json(user);
        return res.status(404).json("ERROR");
    } catch (er) {
        return res.status(500).json(er);
    }
}

function getAll(req, res) {
    try {
        let users = user_service.getAll();
        if (users)
            return res.status(200).json(users);
        res.status(404).json("nothing found");
    } catch (er) {
        console.log(er);
        return res.status(500).json(er);
    }
}

module.exports = {
    login,
    register,
    deleteAll,
    getUserById,
    getAll,
    deleteById,
    get_url_gauth,
    get_user_details,
    update_user,
    google_login,
};
