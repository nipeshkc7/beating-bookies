require('dotenv').config({ path: '../test.env' });

let bets_service = require('../services/d2w-service');
let general_bets_service = require('../services/bets-service');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let expect = chai.expect;
chai.use(chaiHttp);

//Testing API :: d2w routes

describe("Dutch 2 way controller test :", () => {
    before((done) => {
        general_bets_service.deleteAll();
        bets_service.deleteAll();
        done();
    });


    describe('POST:: /d2w)', () => {

        it("POST:: /bets/addBet/ Should successfully add new bet", done => {
            let bet = {
                title: "Collingwood vs eagles",
                teamA_amount: "200",
                teamA_odds: "1.1",
                teamB_amount: "300",
                teamB_odds: "2.2",
                profits: '200',
                result: "undecided",
                date_placed: "2019/02/03"
            };

            chai.request(server)
                .post('/d2w/addBet')
                .send(bet)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.equal('added new bet');
                    done();
                });
        });

        //Get all bets of user
        it("GET:: /bets/getAll/ should get all bets of a user", done => {
            chai.request(server)
                .get('/d2w/getAll')
                .query({ user_id: '1' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.include({ title: "Collingwood vs eagles" });
                    expect(res.body).to.include({
                        teamA_amount: "200",
                        teamA_odds: "1.1",
                        teamB_amount: "300",
                        teamB_odds: "2.2",
                        result: "undecided",
                        date_placed: "2019/02/03"
                    });
                    done();
                });
        });

        //Update a bet
        it("POST:: /bets/updateBet/ should update a bet with the bet_id", done => {
            let bet = {
                bet_id: "1",
                user_id: "1",
                title: "jazz vs blues",
                teamA_amount: "200",
                teamA_odds: "1.1",
                teamB_amount: "300",
                teamB_odds: "2.2",
                profits: "200",
                result: "teamA",
                date_placed: "2019/02/03",
            };
            chai.request(server)
                .post('/d2w/updateBet')
                .send(bet)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        //Deleting a bet
        it("POST:: /bets/deleteBet/ should delete a bet with the bet_id", done => {
            let bet = {
                bet_id: "0"
            };
            chai.request(server)
                .post('/d2w/deleteBet')
                .send(bet)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });


});
