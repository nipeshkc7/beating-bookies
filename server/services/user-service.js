"use strict";
const sqlite3 = require('sqlite-async')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function login(email, password) {
    try {
        let user = await getUserByEmail(email);
        if (!user) {
            return null;
        }
        let passwordIsValid = bcrypt.compareSync(password, user.user_pass);
        if (!passwordIsValid) return null;
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        return { auth: true, token: token, user: user };
    } catch (er) {
        throw Error(er);
    }
}

async function loginOauth(email) {
    try {
        let user = await getUserByEmail(email);
        if (!user) {
            await addUser(email, email, '');
            user = await getUserByEmail(email);
        }
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        return { auth: true, token: token, user: user };
    } catch (er) {
        throw Error(er);
    }
}

async function update_user(old_email, new_name, new_email, new_password) {
    let find_user = await getUserByEmail(old_email);
    if (!find_user) {
        return null;
    }
    let db = await sqlite3.open(process.env.DATABASE);
    await db.run('update user set (name, email, user_pass) = (?,?,?) where id = ?', new_name, new_email, bcrypt.hashSync(new_password, 8), find_user.id);
    find_user = await getUserById(find_user.id);
    if (find_user.name === new_name && bcrypt.compareSync(new_password, find_user.user_pass))
        return 'Ok'
    throw Error('Email could not be updated');
}

async function addUser(username, email, password) {
    try {
        let db = await sqlite3.open(process.env.DATABASE);
        await db.run('INSERT INTO user (name,email,user_pass) VALUES (?,?,?)', [username, email, bcrypt.hashSync(password, 8)]);
        let user = await getUserByEmail(email);
        if (!user) {
            return 'ERROR ! unable to register new user'
        }
        return 'Successfully registered user, Login to continue ...'
    } catch (er) {
        throw Error(er);
    }
}

async function deleteAll() {
    try {
        let db = await sqlite3.open(process.env.DATABASE);
        await db.run('DELETE FROM user');
    } catch (er) {
        throw (er);
    }
}

async function getUserById(id) {
    try {
        let db = await sqlite3.open(process.env.DATABASE);
        let user = await db.get(`SELECT * FROM user WHERE id = ? `, id);
        return user;
    } catch (er) {
        throw Error(er);
    }
}

async function getAll() {
    try {
        let db = await sqlite3.open(process.env.DATABASE);
        let users = await db.get('SELECT * FROM user');
        return users;
    } catch (er) {
        throw Error(er);
    }
}

async function getUserByEmail(email) {
    let db = await sqlite3.open(process.env.DATABASE);
    return await db.get(`SELECT * FROM user WHERE email = ?`, email);
}

async function deleteById(id) {
    try {
        let db = await sqlite3.open(process.env.DATABASE);
        await db.run(`DELETE FROM user WHERE id = ?`, id);
        let check_usr = await getUserById(id);
        if (check_usr)
            throw Error("User not deleted");
    }
    catch (er) {
        throw Error(er);
    }
}

module.exports = {
    addUser,
    login,
    deleteAll,
    deleteById,
    getUserById,
    getAll,
    getUserByEmail,
    update_user,
    loginOauth,
}