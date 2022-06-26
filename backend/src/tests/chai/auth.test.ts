import {app} from '../../index'
import chai from 'chai'
import chaiHttp from 'chai-http'
import {printToConsole} from "../../modules/util/util.module";
chai.use(chaiHttp)


export async function authTest() {

    describe('auth Route Tests', () => {

        /**
         * user/create
         */

        /**
         * Registrate a new user in database
         * Test /user/create
         */
        it(`user:create: should return 201`, async () => {
            return await chai.request(app).post('/user/create')
                .send({
                    name: "Alex",
                    birthdate: "04-03-1980",
                    email: "alex@gmail.de",
                    description: "an human",
                    password: "!1a3r"
                })
                .then(async res => {
                    chai.expect(res.status).to.equal(201);
                    printToConsole("userId:" + res.body);
                })
        })

        /**
         * Registrate a new user with already used name in database
         * Test /user/create
         */
        it(`user:create: should return 400`, async () => {
            return await chai.request(app).post('/user/create')
                .send({
                    name: "Alex",
                    birthdate: "04-03-1980",
                    email: "alex@gmail.de",
                    description: "an human",
                    password: "!1a3r"
                })
                .then(async res => {
                    chai.expect(res.status).to.equal(400);
                })
        })

        /**
         * Registrate a new user in database without name
         * Test /user/create
         */
        it(`user:create: should return 400`, async () => {
            return await chai.request(app).post('/user/create')
                .send({
                    birthdate: "04-03-1980",
                    email: "alex@gmail.de",
                    description: "an human",
                    password: "!1a3r"
                })
                .then(async res => {
                    chai.expect(res.status).to.equal(400);
                })
        })

        /**
         * LOGIN
         * login as user
         * Test /user/login
         */
        it(`user:login: should return 200`, async () => {
            return await chai.request(app).post('/user/login')
                .send({
                    name: "Alex",
                    password: "!1a3r"
                })
                .then(async res => {
                    chai.expect(res.status).to.equal(200);
                })
        })

        /**
         * LOGIN
         * login with wrong password
         * Test /user/login
         */
        it(`user:login: should return 403`, async () => {
            return await chai.request(app).post('/user/login')
                .send({
                    name: "Alex",
                    password: "12"
                })
                .then(async res => {
                    chai.expect(res.status).to.equal(403);
                    chai.expect(res.body.message).to.equal("Your name or password seem to be wrong.");
                })
        })

        /**
         * LOGIN
         * login user not registred (not in database or login)
         * Test /auth/login
         */
        it(`auth:login: should return 403`, async () => {
            return await chai.request(app).post('/auth/login')
                .send({
                    name: "Anna",
                    password: "12"
                })
                .then(async res => {
                    chai.expect(res.status).to.equal(403);
                })
        })
    })
}
