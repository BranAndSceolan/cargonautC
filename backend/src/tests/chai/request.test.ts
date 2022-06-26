import {app} from '../../index';
import chai from 'chai';
import chaiHttp from "chai-http";
import {printToConsole} from "../../modules/util/util.module";
import {requestStatus, trackingStatus} from "../../models/request.model";


chai.use(chaiHttp);
chai.expect;

export async function requestTest() {

    let userId: string;
    let requestId: string;

    describe('Request Route Tests', async () => {

        // Create routes:

        // Create with a single reference to a ride and a user

        it(`should return 201 and id of created request`, async () => {
            await chai.request(app).post('/user/create').send({
                "name": "Hans",
                "birthdate": "1-1-1901",
                "email": "hans@aol.de",
                "password": "123"
            }).then(res => {
                userId = res.body;
            })
            return await chai.request(app).post('/request/create').send({
                "requestStatus": requestStatus.pending,
                "date": "6-23-2022",
                "user": userId,
                "trackingStatus": trackingStatus.pending
            }).then(res => {
                requestId = res.body;
                chai.expect(res.status).to.equal(201);
                chai.expect(res.body._id).to.equal(requestId);
            })
        })

        // Create - Bad Request due to empty field.

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await chai.request(app).post('/request/create').send({
                "requestStatus": requestStatus.pending,
                "date": {},
                "user": userId,
                "trackingStatus": trackingStatus.pending
            }).then(res => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Read routes:

        it(`should return 200 and all requests`, async () => {
            return await chai.request(app).get('/request/getAll').then(res => {
                chai.expect(res.status).to.equal(200);
            })
        })

        it(`should return 200 and the correct request`, async () => {
            return await chai.request(app).get(`/reuquest/findById/${requestId}`).then(async res => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(requestId);
            })
        })

        // Update routes:

        it(`should return 200 and the updated item`, async () => {
            return await chai.request(app).post(`/request/update/${requestId}`).send({
                "requestStatus": requestStatus.pending,
                "date": "6-23-2022",
                "user": userId,
                "trackingStatus": trackingStatus.departed
            }).then(res => {
                printToConsole(res.body)
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(requestId);
            })
        })

        // Update - Bad Request due to empty field.

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await chai.request(app).post(`/request/update/${requestId}`).send({
                "requestStatus": {},
                "date": "6-23-2022",
                "user": userId,
                "trackingStatus": trackingStatus.departed
            }).then(res => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Delete routes:

        it(`should return 200 and the deleted request`, async () => {
            return await chai.request(app).delete(`/request/delete/${requestId}`).then(res => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(requestId);
            })
        })

        it('user deletion\n', async () => {
            printToConsole(userId)
            return await chai.request(app).delete(`/user/delete/${userId}`).then(res => {
                chai.expect(res.status).to.equal(200)
                chai.expect(res.body._id).to.equal(`${userId}`)
            });
        })
    })
}

