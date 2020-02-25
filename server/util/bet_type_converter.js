// Converting Dutch 2 way, dutch 3 way and Back/lay bets into a general BET TYPE

function d2w_to_general(d2w_bet) {
    let winnings = '0';
    let stakes = eval(d2w_bet.teamA_amount) + eval(d2w_bet.teamB_amount);
    if (d2w_bet.result == "teamA")
        winnings = eval(d2w_bet.teamA_amount) * eval(d2w_bet.teamA_odds);
    if (d2w_bet.result == "teamB")
        winnings = eval(d2w_bet.teamB_amount) * eval(d2w_bet.teamB_odds);

    let general_bet = {
        bet_id: d2w_bet.bet_id,
        title: d2w_bet.title,
        type: 'd2w',
        stakes: stakes,
        winnings: winnings,
        profits: d2w_bet.profits,
        date_placed: d2w_bet.date_placed,
    }
    return general_bet;
}

function d3w_to_general(d3w_bet) {
    let winnings = '0';
    let stakes = eval(d3w_bet.teamA_amount) + eval(d3w_bet.teamB_amount) + eval(d3w_bet.draw_amount);
    if (d3w_bet.result == "teamA")
        winnings = eval(d3w_bet.teamA_amount) * eval(d3w_bet.teamA_odds);
    if (d3w_bet.result == "teamB")
        winnings = eval(d3w_bet.teamB_amount) * eval(d3w_bet.teamB_odds);
    if (d3w_bet.result == "draw")
        winnings = eval(d3w_bet.draw_amount) * eval(d3w_bet.draw_odds);

    let general_bet = {
        bet_id: d3w_bet.bet_id,
        title: d3w_bet.title,
        type: 'd3w',
        stakes: stakes,
        winnings: winnings,
        profits: d3w_bet.profits,
        date_placed: d3w_bet.date_placed,
    }
    return general_bet;
}

function blay_to_general(blay_bet) {
    let bet_id = null;
    if (blay_bet.bet_id)
        bet_id = blay_bet.bet_id;
    let winnings = '0';
    let stakes = eval(blay_bet.back_amount) + eval(blay_bet.lay_amount);
    if (blay_bet.result == "win")
        winnings = eval(blay_bet.back_amount) * eval(blay_bet.back_odds);
    if (blay_bet.result == "lose") {
        let liability = (eval(blay_bet.lay_odds) * eval(blay_bet.lay_amount)) - eval(blay_bet.lay_amount)
        winnings = liability + (eval(blay_bet.lay_amount) - (eval(blay_bet.lay_amount) * (eval(blay_bet.betfair_commission) / 100)));
    }

    let general_bet = {
        bet_id: bet_id,
        title: blay_bet.title,
        type: 'blay',
        stakes: stakes,
        winnings: winnings,
        profits: blay_bet.profits,
        date_placed: blay_bet.date_placed,
    }

    return general_bet;
}

module.exports = {
    d2w_to_general,
    d3w_to_general,
    blay_to_general,
}