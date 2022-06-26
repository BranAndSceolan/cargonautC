import {app} from '../../index';
import chai from 'chai';
import chaiHttp from "chai-http";
import {printToConsole} from "../../modules/util/util.module";


chai.use(chaiHttp);
chai.expect;

export async function userTest() {

    let userId: string;

    describe('Request Route Tests', async () => {

        // Create routes:

        // Create with a single reference to a ride and a user

        it(`should return 201 and id of created user`, async () => {
            return await chai.request(app).post('/user/create').send({
                "name": "Hans",
                "birthdate": "1-1-1901",
                "email": "hans@aol.de",
                "password": "123",
                "description": "Ich bin der Hans und ich kann's"
            }).then(res => {
                userId = res.body;
                chai.expect(res.status).to.equal(201);
                chai.expect(res.body._id).to.equal(userId);
            })
        })

        // Create - Bad Request due to empty field.

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await chai.request(app).post('/user/create').send({
                "name": {},
                "birthdate": "1-1-1901",
                "email": "hans@aol.de",
                "password": "123",
                "description": "Ich bin der Hans und ich kann's"
            }).then(res => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Read routes:

        it(`should return 200 and all user`, async () => {
            return await chai.request(app).get('/user/getAll').then(res => {
                chai.expect(res.status).to.equal(200);
            })
        })

        it(`should return 200 and the correct user`, async () => {
            return await chai.request(app).get(`/user/getByName/Hans`).then(async res => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(userId);
            })
        })

        // Update routes:

        it(`should return 200 and the updated user`, async () => {
            return await chai.request(app).post(`/user/update/${userId}`).send({
                "name": "Hans",
                "birthdate": "1-1-1901",
                "email": "hans@aol.de",
                "password": "123",
                "description": "Ich bin der Hans und ich kann's",
                "averageEvalOfRides": 0
            }).then(res => {
                printToConsole(res.body)
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(userId);
            })
        })

        // Update - Bad Request due to empty field.

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await chai.request(app).post(`/user/update/${userId}`).send({
                "name": "Hans",
                "birthdate": "1-1-1901",
                "email": {},
                "password": "123",
                "description": "Ich bin der Hans und ich kann's",
                "averageEvalOfRides": 0
            }).then(res => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Delete routes:

        it(`should return 200 and the deleted user`, async () => {
            return await chai.request(app).delete(`/user/delete/${userId}`).then(res => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(userId);
            })
        })

    })
}

