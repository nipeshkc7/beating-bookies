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
        let rows = await db.all(`SELECT * FROM bets WHERE user_id = ?`, [user_id]);
        let bets = await rows.map(async (row) => {
            let detailedRow = await getBetDetails(row, user_id);
            return detailedRow;
        })
        const all_bets = await Promise.all(bets);
        return await Promise.all(bets);
    } catch (er) {
        console.log(er);
        throw Error(er);
    }
}

async function getBetDetails(bet, user_id) {
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

