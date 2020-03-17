"use strict";
const sqlite3 = require('sqlite-async')
const { d2w_to_general } = require('../util/bet_type_converter');
const general_bet_service = require('../services/bets-service');

async function insertBet(bet, user_id) {
    try {
        let db = await sqlite3.open(process.env.DATABASE);
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
        let db = await sqlite3.open(process.env.DATABASE);
        let found_bet = await db.get(`SELECT * FROM d2w WHERE bet_id = ? `, bet.bet_id);
        return found_bet;
    }
    catch (er) {
        throw new Error(er);
    }
}

async function getAllBets(user_id) {
    try {
        let db = await sqlite3.open(process.env.DATABASE);
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
        let db = await sqlite3.open(process.env.DATABASE);
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
        let db = await sqlite3.open(process.env.DATABASE);
        await db.run(`DELETE FROM d2w WHERE bet_id = ?`, bet_id);
    } catch (er) {
        throw new Error(er);
    }
}

async function deleteAll() {
    try {
        let db = await sqlite3.open(process.env.DATABASE);
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

