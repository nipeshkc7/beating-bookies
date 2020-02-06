require('dotenv').config({ path: './test.env' });

let user_service = require('../services/user-service');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let expect = chai.expect;
chai.use(chaiHttp);


//Testing API :: /user routes


describe("User controller test :", () => {
    before((done) => { 
        user_service.deleteAll();
        done();
    });

    describe('POST:: /user)', () => {
        it("POST:: /user/register/ Should successfully register user", done => {
            let user = {
                name: "Arpan Kc",
                email: "niekc7@gmail.com",
                password: "nipesh62297",
            };

            chai.request(server)
                .post('/user/register')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it("POST:: /user/register/ Should not accept duplicate values", done => {
            let user = {
                name: "Arpan Kc",
                email: "niekc7@gmail.com",
                password: "nipesh62297",
            };

            chai.request(server)
                .post('/user/register')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(409);
                    done();
                });
        });
        
        it("POST:: /user/login registered user should be able to login successfully", done => {
            let user = {
                email: "niekc7@gmail.com",
                password: "nipesh62297",
            };

            chai.request(server)
                .post('/user/login')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it("POST:: /user/login unregistered user should NOT be able to login successfully", done => {
            let user = {
                email: "unregistered@gmail.com",
                password: "nipesh62297",
            };

            chai.request(server)
                .post('/user/login')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });
    });
});
