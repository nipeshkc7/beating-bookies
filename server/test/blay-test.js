require('dotenv').config({ path: '../test.env' });

let bets_service = require('../services/blay-service');
let general_bets_service = require('../services/bets-service');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let expect = chai.expect;
chai.use(chaiHttp);

//Testing API :: blay routes

describe("Back/lay bets or blay controller test :", () => {
    before((done) => {
        general_bets_service.deleteAll();
        bets_service.deleteAll();
        done();
    });


    describe('POST:: /blay)', () => {

        it("POST:: /bets/addBet/ Should successfully add new bet", done => {
            let bet = {
                title: "Collingwood vs Eastwood",
                back_amount: "100",
                back_odds: "1.1",
                lay_amount: "400",
                lay_odds: "2.1",
                profits: "300",
                result: "win",
                snr: "yes",
                betfair_commission: "20",
                date_placed: "2019/02/02",
            };

            chai.request(server)
                .post('/blay/addBet')
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
                .get('/blay/getAll')
                .query({ user_id: '1' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.include({ title: "Collingwood vs Eastwood" });
                    done();
                });
        });

        //Update a bet
        it("POST:: /bets/updateBet/ should update a bet with the bet_id", done => {
            let bet = {
                bet_id: "1",
                user_id: "1",
                title: "updated Collingwood vs Eastwood",
                back_amount: "1000",
                back_odds: "1.10",
                lay_amount: "400",
                lay_odds: "2.1",
                profits: "300",
                result: "lose",
                snr: "yes",
                betfair_commission: "20",
                date_placed: "2019/02/02",
            };
            chai.request(server)
                .post('/blay/updateBet')
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
                .post('/blay/deleteBet')
                .send(bet)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });


});
