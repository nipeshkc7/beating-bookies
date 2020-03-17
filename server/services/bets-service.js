"use strict";
const sqlite3 = require('sqlite-async');

async function insertBet(bet, user_id) {
    try {
        let db = await sqlite3.open(process.env.DATABASE);
        let result = await db.run('INSERT INTO bets (user_id, title, type, stakes, winnings, profits, date_placed) VALUES (?,?,?,?,?,?,?)', [user_id, bet.title, bet.type, bet.stakes, bet.winnings, bet.profits, bet.date_placed]);
        return result.lastID;
    }
    catch (er) {
        throw new Error(er);
    }
}

async function getBet(bet) {
    try {
        let db = await sqlite3.open(process.env.DATABASE);
        let found_bet = await db.get(`SELECT * FROM bets WHERE bet_id = ? `, bet.bet_id);
        return found_bet;
    }
    catch (er) {
        throw new Error(er);
    }
}

async function getAllBets(user_id) {
    try {
        let db = await sqlite3.open(process.env.DATABASE);
        let rows = await db.all(`SELECT * FROM bets WHERE user_id = ?`, [user_id]);
        let bets = await rows.map(async (row) => {
            let detailedRow = await getBetDetails(db, row, user_id);
            return detailedRow;
        })
        const all_bets = await Promise.all(bets);
        return await Promise.all(bets);
    } catch (er) {
        console.log(er);
        throw Error(er);
    }
}

async function getBetDetails(db, bet, user_id) {
    try {
        if (bet.type == 'd2w') {
            let all_bets = await db.get(`SELECT * FROM d2w AS betD INNER JOIN bets ON betD.bet_id = bets.bet_id WHERE bets.user_id = ? AND bets.bet_id =?`, user_id, bet.bet_id);
            return all_bets;
        }
        if (bet.type == 'd3w') {
            let all_bets = await db.get(`SELECT * FROM d3w AS betD INNER JOIN bets ON betD.bet_id = bets.bet_id WHERE bets.user_id = ? AND bets.bet_id =?`, user_id, bet.bet_id);
            return all_bets;
        }
        if (bet.type == 'blay') {
            let all_bets = await db.get(`SELECT * FROM blay AS betD INNER JOIN bets ON betD.bet_id = bets.bet_id WHERE bets.user_id = ? AND bets.bet_id =?`, user_id, bet.bet_id);
            return all_bets;
        }
        return bet;
    } catch (er) {
        console.log(er);
    }
}

async function updateBet(bet) {
    try {
        let db = await sqlite3.open(process.env.DATABASE);
        let result = await db.run('update bets set (title, type, stakes, winnings, profits) = (?,?,?,?,?) where bet_id = ?', bet.title, bet.type, bet.stakes, bet.winnings, bet.profits, bet.bet_id);
        return result.lastID;
    } catch (er) {
        throw new Error(er);
    }
}

async function deleteBet(bet_id) {
    try {
        let db = await sqlite3.open(process.env.DATABASE);
        await db.run(`DELETE FROM bets WHERE bet_id = ?`, bet_id);
    } catch (er) {
        throw new Error(er);
    }
}

async function deleteAll() {
    try {
        let db = await sqlite3.open(process.env.DATABASE);
        await db.run('DELETE FROM bets');
        await db.run('DELETE FROM blay');
        await db.run('DELETE FROM d2w');
        await db.run('DELETE FROM d3w');
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

