import chaiHttp from "chai-http";
import chai from "chai";
import {app} from '../../index';


chai.use(chaiHttp);

// Test base route to return string
describe('Base Route Test', () => {
    it(`should return a html file`, () => {
        return chai.request(app).get('/')
            .then(res  => {
                chai.expect(res).to.be.html
            })
    })
})
