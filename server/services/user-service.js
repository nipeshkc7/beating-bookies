"use strict";
const sqlite3 = require('sqlite-async')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

let db = null;

async function createDb() {
    try {
        db = await sqlite3.open(process.env.DATABASE);
        const sql = `
             CREATE TABLE IF NOT EXISTS user (
                 id integer PRIMARY KEY, 
                 name text, 
                 email text UNIQUE, 
                 user_pass text,
                 is_admin integer)`
        await db.run(sql);
    }
    catch (er) {
        throw new Error(er);
    }
}

createDb();

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

async function update_user(old_name, old_email, old_password, new_name, new_email, new_password) {
    let find_user = await getUserByEmail(old_email);
    if (!find_user) {
        return null;
    }
    await db.run('update user set (name, email, user_pass) = (?,?,?) where id = ?', new_name, new_email, bcrypt.hashSync(new_password, 8), find_user.id);
    find_user = await getUserById(find_user.id);
    if (find_user.name === new_name && bcrypt.compareSync(new_password, find_user.user_pass))
        return 'Ok'
    throw Error('Email could not be updated');
}

async function addUser(username, email, password) {
    try {
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
        await db.run('DELETE FROM user');
    } catch (er) {
        throw (er);
    }
}

async function getUserById(id) {
    try {
        let user = await db.get(`SELECT * FROM user WHERE id = ? `, id);
        return user;
    } catch (er) {
        throw Error(er);
    }
}

async function getAll() {
    try {
        let users = await db.get('SELECT * FROM user');
        return users;
    } catch (er) {
        throw Error(er);
    }
}

async function getUserByEmail(email) {
    return await db.get(`SELECT * FROM user WHERE email = ?`, email);
}

async function deleteById(id) {
    try {
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


// class userService {
//     constructor() {
//         this.db = this.createDb();
//         this.createTable(this.db);
//         //this.db = init_db();
//     }

//     async createDb(){
//         let db= await sqlite3.open(process.env.DATABASE);
//         return db;
//     }
//     async createTable(db) {
//         const sql = `
//             CREATE TABLE IF NOT EXISTS user (
//                 id integer PRIMARY KEY, 
//                 name text, 
//                 email text UNIQUE, 
//                 user_pass text,
//                 is_admin integer)`
//         return await db.run(sql);
//     }

//     // selectByEmail(email, callback) {
//     //     return this.db.get(
//     //         `SELECT * FROM user WHERE email = ?`,
//     //         [email], function (err, row) {
//     //             callback(err, row)
//     //         })
//     // }

//     insertAdmin(user, callback) {
//         return this.db.run(
//             'INSERT INTO user (name,email,user_pass,is_admin) VALUES (?,?,?,?)',
//             user, (err) => {
//                 callback(err)
//             })
//     }

//     selectAll(callback) {
//         return this.db.all(`SELECT * FROM user`, function (err, rows) {
//             callback(err, rows)
//         })
//     }

//     async login(email) {
//         try {
//             let user = await this.db.get(
//                 `SELECT * FROM user WHERE email = ?`,
//                 [email], function (err, row) {
//                     callback(err, row)
//                 });
//             if (!user) {
//                 return null;
//             }
//             let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
//             if (!passwordIsValid) return null;
//             let token = jwt.sign({ id: user.id }, config.secret, {
//                 expiresIn: 86400 // expires in 24 hours
//             });
//             return token;
//         } catch (er) {
//             throw Error('Unable to find user');
//         }
//     }

//     async addUser(user) {
//         try {
//             await this.db.run('INSERT INTO user (name,email,user_pass) VALUES (?,?,?)', user);
//         } catch (er) {
//             console.log(er);
//             throw Error('unable to add new user');
//         }
//         return token = jwt.sign({ id: user.id }, config.secret, {
//             expiresIn: 86400 // expires in 24 hours
//         });

//     }
// }

// module.exports = userService;