require('dotenv').config({ path: '../test.env'});

let user_service = require('../services/user-service');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let expect = chai.expect;
chai.use(chaiHttp);

//Testing API :: user routes

describe("User controller test :", () => {
    before((done) => {
        user_service.deleteAll();
        done();
    });

    //Register new user
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

        //Add duplicate values
        it("POST:: /user/register/ Should not accept duplicate values", done => {
            
            let old_user = {
                name: "Arpan Kc",
                email: "niekc7@gmail.com",
                password: "nipesh62297",
            };

            let new_user = {
                name: "Arpan Kc",
                email: "niekc7@gmail.com",
                password: "nipesh62297",
            };

            chai.request(server)
                .post('/user/register')
                .send({old: old_user,
                        new: new_user})
                .end((err, res) => {
                    expect(res).to.have.status(409);
                    done();
                });
        });

        //Login registered user
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

        //Login unregistered user
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

        //Get All Users
        it("GET:: /user/getAll Get list of all users", done => {
            chai.request(server)
                .get('/user/GetAll')
                .send()
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        //Get User By Id
        it("GET:: /user/getUserById Get user by id", done => {
            let id = '1';
            chai.request(server)
                .get('/user/getUserById')
                .send({ id: id })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it("POST:: /user/updateUser Update user", done => {
            let user = {
                new_name: "Arpan Kc",
                new_email: "nippon@gmail.com",
                new_password: "nipesh62297",
                old_name: "Arpan Kc",
                old_email: "niekc7@gmail.com",
                old_password: "nipesh62297",            
            };

            chai.request(server)
                .post('/user/updateUser')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });


        //Remove user by id
        it("POST:: /user/delete/:id delete User by Id", done => {
            let id = '1';
            chai.request(server)
                .post('/user/delete')
                .send({ id: id })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});
