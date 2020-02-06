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
    try{
        const authorization = await user_service.login(req.body.email,req.body.password);
        if(authorization == null)
            return res.status(401).send(authorization);
        return res.status(200).send(authorization);
    }
    catch(er){
        return res.status(500).send('error on server'+ er);
    }
}

function deleteAll(req,res){
    try{
        user_service.deleteAll();
        return res.status(200).send("successfully deleted");
    }catch(er){
        return res.status(500).send("unsuccessful");
    }
}

module.exports = {
    login,
    register,
    deleteAll,
};
