"use strict";
const sqlite3 = require('sqlite-async')

let db = null;

async function createDb() {
    try {
        db = await sqlite3.open(process.env.DATABASE);
        const sql = `
             CREATE TABLE IF NOT EXISTS bets (
                bet_id integer PRIMARY KEY, 
                user_id integer, 
                title text, 
                type text, 
                stakes REAL,
                winnings REAL,
                profits REAL,
                date_placed text)`
        await db.run(sql);
    }
    catch (er) {
        throw new Error(er);
    }
}

createDb();

async function insertBet(bet, user_id) {
    try {
        let result = await db.run('INSERT INTO bets (user_id, title, type, stakes, winnings, profits, date_placed) VALUES (?,?,?,?,?,?,?)', [user_id, bet.title, bet.type, bet.stakes, bet.winnings, bet.profits, bet.date_placed]);
        return result.lastID;
    }
    catch (er) {
        throw new Error(er);
    }
}

async function getBet(bet) {
    try {
        let found_bet = await db.get(`SELECT * FROM bets WHERE bet_id = ? `, bet.bet_id);
        return found_bet;
    }
    catch (er) {
        throw new Error(er);
    }
}

async function getAllBets(user_id) {
    try {
        let bets = await db.get(`SELECT * FROM bets WHERE user_id = ?`, user_id);
        return bets;
    } catch (er) {
        throw Error(er);
    }
}

async function updateBet(bet) {
    try {
        let result = await db.run('update bets set (title, type, stakes, winnings, profits) = (?,?,?,?,?) where bet_id = ?', bet.title, bet.type, bet.stakes, bet.winnings, bet.profits, bet.bet_id);
        return result.lastID;
    } catch (er) {
        throw new Error(er);
    }
}

async function deleteBet(bet_id) {
    try {
        await db.run(`DELETE FROM bets WHERE bet_id = ?`, bet_id);
    } catch (er) {
        throw new Error(er);
    }
}

async function deleteAll() {
    try {
        await db.run('DELETE FROM bets');
    } catch (er) {
        throw new Error(er);
    }
}

module.exports = {
    insertBet,
    getBet,
    updateBet,
    deleteBet,
    getAllBets,
    deleteAll
}

