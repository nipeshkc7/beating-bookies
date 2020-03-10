"use strict";
const { getUserId } = require('../util/authorize');
const bet_service = require('../services/bets-service');

async function addBet(req, res, next) {
    try {
        let user_id = await getUserId(req.headers.authorization);
        let bets = {
            title: req.body.title,
            type: req.body.type,
            stakes: req.body.stakes,
            winnings: req.body.winnings,
            profits: req.body.profits,
            date_placed: req.body.date_placed
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
            type: req.body.type,
            stakes: req.body.stakes,
            winnings: req.body.winnings,
            profits: req.body.profits
        }
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
        if(!req.query.user_id) throw new Error('Bad request');
        let bets = await bet_service.getAllBets(req.query.user_id);
        return res.status('200').json(bets);
    } catch (er) {
        return res.status('500').end('Server error: ' + er);
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