import {app} from '../../index';
import chai from 'chai';
import chaiHttp from "chai-http";
import {printToConsole} from "../../modules/util/util.module";
import {vehicleType} from "../../models/vehicle.model";


chai.use(chaiHttp);
chai.expect;

export async function vehicleTest() {

    let vehicleId: string;

    describe('Request Route Tests', async () => {

        // Create routes:

        it(`should return 201 and id of created user`, async () => {
            return await chai.request(app).post('/vehicle/create').send({
                "type": vehicleType.standardCar,
                "numberOfSeats": 2,
                "notes": "Smart"
            }).then(res => {
                vehicleId = res.body;
                chai.expect(res.status).to.equal(201);
                chai.expect(res.body._id).to.equal(vehicleId);
            })
        })

        // Create - Bad Request due to empty field.

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await chai.request(app).post('/vehicle/create').send({
                "type": {},
                "numberOfSeats": 2,
                "notes": "Smart"
            }).then(res => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Read routes:

        it(`should return 200 and all vehicle`, async () => {
            return await chai.request(app).get('/vehicle/getAll').then(res => {
                chai.expect(res.status).to.equal(200);
            })
        })

        it(`should return 200 and the correct vehicle`, async () => {
            return await chai.request(app).get(`/vehicle/getById/${vehicleId}`).then(async res => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(vehicleId);
            })
        })

        // Update routes:

        it(`should return 200 and the updated vehicle`, async () => {
            return await chai.request(app).post(`/vehicle/update/${vehicleId}`).send({
                "type": vehicleType.standardCar,
                "numberOfSeats": 2,
                "notes": "Cooler Smart!"
            }).then(res => {
                printToConsole(res.body)
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(vehicleId);
            })
        })

        // Update - Bad Request due to empty field.

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await chai.request(app).post(`/vehicle/update/${vehicleId}`).send({
                "type": vehicleType.standardCar,
                "numberOfSeats": {},
                "notes": "Cooler Smart!"
            }).then(res => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Delete routes:

        it(`should return 200 and the deleted vehicle`, async () => {
            return await chai.request(app).delete(`/vehicle/delete/${vehicleId}`).then(res => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(vehicleId);
            })
        })

    })
}

