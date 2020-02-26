"use strict";
const sqlite3 = require('sqlite-async')
const { d2w_to_general } = require('../util/bet_type_converter');
const general_bet_service = require('../services/bets-service');
let db = null;

async function createDb() {
    try {
        db = await sqlite3.open(process.env.DATABASE);
        const sql = `
             CREATE TABLE IF NOT EXISTS d2w (
                bet_id integer PRIMARY KEY, 
                teamA_amount text, 
                teamA_odds text, 
                teamB_amount text,
                teamB_odds text,
                profits text,
                result text
                )`
        await db.run(sql);
    }
    catch (er) {
        console.log(er);
        throw new Error(er);
    }
}

createDb();

async function insertBet(bet, user_id) {
    try {
        let general_bet = d2w_to_general(bet);
        let bet_id = await general_bet_service.insertBet(general_bet, user_id);
        await db.run('INSERT INTO d2w (bet_id, teamA_amount, teamA_odds, teamB_amount, teamB_odds, profits, result) VALUES (?,?,?,?,?,?,?)',
            [bet_id, bet.teamA_amount, bet.teamA_odds, bet.teamB_amount, bet.teamB_odds, bet.profits, bet.result]);
    }
    catch (er) {
        throw new Error(er);
    }
}

async function getBet(bet) {
    try {
        let found_bet = await db.get(`SELECT * FROM d2w WHERE bet_id = ? `, bet.bet_id);
        return found_bet;
    }
    catch (er) {
        throw new Error(er);
    }
}

async function getAllBets(user_id) {
    try {
        let bets = await db.get(`
        select * 
        FROM d2w
        INNER JOIN bets
        ON d2w.bet_id = bets.bet_id
        WHERE bets.user_id = ?`, user_id);
        return bets;
    } catch (er) {
        console.log('ERROR' + er);
        throw Error(er);
    }
}

async function updateBet(bet) {
    try {
        let general_bet = d2w_to_general(bet);
        await general_bet_service.updateBet(general_bet);
        await db.run('update d2w set (teamA_amount, teamA_odds, teamB_amount, teamB_odds, profits, result) = (?,?,?,?,?,?) where bet_id = ?'
            , bet.teamA_amount, bet.teamA_odds, bet.teamB_amount, bet.teamB_odds, bet.profits, bet.result, bet.bet_id);
    } catch (er) {
        throw new Error(er);
    }
}

async function deleteBet(bet_id) {
    try {
        await db.run(`DELETE FROM d2w WHERE bet_id = ?`, bet_id);
    } catch (er) {
        throw new Error(er);
    }
}

async function deleteAll() {
    try {
        await db.run('DELETE FROM d2w');
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

