"use strict";
const { getUserId } = require('../util/authorize');
const bet_service = require('../services/d2w-service');

async function addBet(req, res, next) {
    try {
        let user_id = getUserId(req.headers.authorization);
        let bets = {
            title: req.body.title,
            teamA_amount: req.body.teamA_amount,
            teamB_amount: req.body.teamB_amount,
            teamA_odds: req.body.teamA_odds,
            teamB_odds: req.body.teamB_odds,
            result: req.body.result,
            profit: req.body.profit,
            date_placed: req.body.date_placed,
        }
        await bet_service.insertBet(bets, user_id);
        res.status('200').json('added new bet');

    } catch (er) {
        res.status('500').json('Server error: ' + er);
    }
}

async function deleteBet(req, res, next) {
    try {
        await bet_service.deleteBet(req.body.bet_id);
        return res.status('200').json('Successfully deleted bet');
    } catch (er) {
        return res.status('500').json('Server error: ' + er);
    }
}

async function updateBet(req, res, next) {
    try {
        let bet = {
            bet_id: req.body.bet_id,
            user_id: req.body.user_id,            
            title: req.body.title,
            teamA_amount: req.body.teamA_amount,
            teamB_amount: req.body.teamB_amount,
            teamA_odds: req.body.teamA_odds,
            teamB_odds: req.body.teamB_odds,
            result: req.body.result,
            profit: req.body.profit,
            date_placed: req.body.date_placed,        }
        await bet_service.updateBet(bet);
        return res.status('200').json('Successfully updated');
    } catch (er) {
        res.status('500').json('Server error: ' + er);
    }
}

async function getBet(req, res, next) {
    try {
        let bet = await bet_service.getBet(req.bet_id);
        return res.status('200').json(bet);
    } catch (er) {
        return res.status('500').json('Server error: ' + er);
    }
}

async function getAll(req, res, next) {
    try {
        let bets = await bet_service.getAllBets(req.body.user_id);
        return res.status('200').json(bets);
    } catch (er) {
        return res.status('500').json('Server error: ' + er);
    }
}

async function deleteAll(req, res, next) {
    try {
        await bet_service.deleteAll();
    } catch (er) {
        return res.status('500').json('Sever error: ' + er);
    }
}

module.exports = {
    addBet,
    deleteBet,
    updateBet,
    getBet,
    getAll,
    deleteAll
}