require('dotenv').config({ path: '../test.env' });

let bets_service = require('../services/bets-service');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let expect = chai.expect;
chai.use(chaiHttp);

//Testing API :: bets routes

describe("Bets controller test :", () => {
    before((done) => {
        bets_service.deleteAll();
        done();
    });


    describe('POST:: /bets)', () => {

        it("POST:: /bets/addBet/ Should successfully add new bet", done => {
            let bet = {
                title: "Collingwood vs Eastwood",
                type: "d2w",
                stakes: "100",
                winnings: "400",
                profits: "300",
                date_placed: "2019/02/02",
            };

            chai.request(server)
                .post('/bets/addBet')
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
                .get('/bets/getAll')
                .query({ user_id: '1' })
                .end((err, res) => {
                    console.log(res.body);
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.include({ title: "Collingwood vs Eastwood" });
                    done();
                });
        });

        //Update a bet
        it("GET:: /bets/updateBet/ should update a bet with the bet_id", done => {
            let bet = {
                bet_id: "1",
                user_id: "1",
                title: "Collingwood vs Not EastWood",
                type: "d3w",
                stakes: "300",
                winnings: "400",
                profits: "300",
                date_placed: "2019/02/02",
            };
            chai.request(server)
                .post('/bets/updateBet')
                .query(bet)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });        
        
        //Deleting a bet
        it("POST:: /bets/deleteBet/ should delete a bet with the bet_id", done => {
            let bet = {
                bet_id: "1"
            };
            chai.request(server)
                .post('/bets/deleteBet')
                .send(bet)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });


});
