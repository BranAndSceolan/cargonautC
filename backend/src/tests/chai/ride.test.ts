import {app} from '../../index';
import chai from 'chai';
import chaiHttp from "chai-http";
import {printToConsole} from "../../modules/util/util.module";



chai.use(chaiHttp);
chai.expect;

export async function rideTest() {

    let userId: string;
    let rideId: string;

    describe('Request Route Tests', async () => {

        // Create routes:

        // Create with a single reference to a ride and a user

        it(`should return 201 and id of created ride`, async () => {
            await chai.request(app).post('/user/create').send({
                "name": "Hans",
                "birthdate": "1-1-1901",
                "email": "hans@aol.de",
                "password": "123",
                "description": "Hallo ich bin der Hans"
            }).then(res => {
                userId = res.body;
            })
            return await chai.request(app).post('/ride/create').send({
                "date": "6-23-2022",
                "origin": "Frankfurt",
                "destination": "Hattersheim",
                "title": "Titel",
                "description": "Off we go",
                "numberOfFreeSeats": 4,
                "user": userId
            }).then(res => {
                rideId = res.body;
                chai.expect(res.status).to.equal(201);
                chai.expect(res.body._id).to.equal(rideId);
            })
        })

        // Create - Bad Request due to empty field.

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await chai.request(app).post('/ride/create').send({
                "date": "6-23-2022",
                "origin": {},
                "destination": "Hattersheim",
                "title": "Titel",
                "description": "Off we go",
                "numberOfFreeSeats": 4,
                "user": userId
            }).then(res => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Read routes:

        it(`should return 200 and all rides`, async () => {
            return await chai.request(app).get('/ride/getAll').then(res => {
                chai.expect(res.status).to.equal(200);
            })
        })

        it(`should return 200 and the correct rides`, async () => {
            return await chai.request(app).get(`/ride/findById/${rideId}`).then(async res => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(rideId);
            })
        })

        // Update routes:

        it(`should return 200 and the updated item`, async () => {
            return await chai.request(app).post(`/ride/update/${rideId}`).send({
                "date": "6-23-2022",
                "origin": "Seligenstadt",
                "destination": "Hattersheim",
                "title": "Titel",
                "description": "Off we go",
                "numberOfFreeSeats": 4,
                "user": userId
            }).then(res => {
                printToConsole(res.body)
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(rideId);
            })
        })

        // Update - Bad Request due to empty field.

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await chai.request(app).post(`/ride/update/${rideId}`).send({
                "date": {},
                "origin": "Seligenstadt",
                "destination": "Hattersheim",
                "title": "Titel",
                "description": "Off we go",
                "numberOfFreeSeats": 4,
                "user": userId
            }).then(res => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Delete routes:

        it(`should return 200 and the deleted ride`, async () => {
            return await chai.request(app).delete(`/ride/delete/${rideId}`).then(res => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(rideId);
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

