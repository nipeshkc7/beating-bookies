"use strict";
const sqlite3 = require('sqlite-async')
const { blay_to_general } = require('../util/bet_type_converter');
const general_bet_service = require('../services/bets-service');
let db = null;

async function createDb() {
    try {
        db = await sqlite3.open(process.env.DATABASE);
        const sql = `
             CREATE TABLE IF NOT EXISTS blay (
                bet_id integer PRIMARY KEY, 
                back_amount text, 
                back_odds text, 
                lay_odds text,
                lay_amount text,
                profits text,
                SNR text,
                result text,
                betfair_commission text
                )`
        await db.run(sql);
    }
    catch (er) {
        throw new Error(er);
    }
}

createDb();

async function insertBet(bet, user_id) {
    try {
        let general_bet = blay_to_general(bet);
        let bet_id = await general_bet_service.insertBet(general_bet, user_id);
        await db.run('INSERT INTO blay (bet_id, back_amount, back_odds, lay_odds, lay_amount, profits, SNR, result, betfair_commission) VALUES (?,?,?,?,?,?,?,?,?)', [bet_id, bet.back_amount, bet.back_odds, bet.lay_odds, bet.lay_amount, bet.profits, bet.snr, bet.result, bet.betfair_commission]);
    }
    catch (er) {
        throw new Error(er);
    }
}

async function getBet(bet) {
    try {
        let found_bet = await db.get(`SELECT * FROM blay WHERE bet_id = ? `, bet.bet_id);
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
        FROM blay
        INNER JOIN bets
        ON blay.bet_id = bets.bet_id
        WHERE bets.user_id = ?`, user_id);
        return bets;
    } catch (er) {
        console.log('ERROR' + er);
        throw Error(er);
    }
}

async function updateBet(bet) {
    try {
        let general_bet = blay_to_general(bet);
        console.log(general_bet);
        await general_bet_service.updateBet(general_bet);
        await db.run('update blay set ( back_amount, back_odds, lay_odds, lay_amount, profits, SNR, result, betfair_commission) = (?,?,?,?,?,?,?,?) where bet_id = ?'
            , bet.back_amount, bet.back_odds, bet.lay_odds, bet.lay_amount, bet.profits, bet.snr, bet.result, bet.betfair_commission, bet.bet_id);
    } catch (er) {
        console.log("UPDATE ERROR " + er);
        throw new Error(er);
    }
}

async function deleteBet(bet_id) {
    try {
        await db.run(`DELETE FROM blay WHERE bet_id = ?`, bet_id);
    } catch (er) {
        throw new Error(er);
    }
}

async function deleteAll() {
    try {
        await db.run('DELETE FROM blay');
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

