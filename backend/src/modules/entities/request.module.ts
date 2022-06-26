import {EntityModule} from "./entity.module";
import {MongoModule} from "../mongo/mongo.module";
import {Req, RequestClass} from "../../models/request.model";
import mongoose from "mongoose";
import {printToConsole} from "../util/util.module";

/**
 * Module for evaluations, providing all label functionalities
 *     for evaluation controller using methods of mongo module.
 */
export class RequestModule extends EntityModule {
    constructor(mongo: MongoModule) {
        super(mongo);
    }

    /**
     * calls addRequest() method of mongo.module, to create a new request
     * @return {mongoose.Types.ObjectId|null} id for created evaluation
     * @param requestData
     */
    async createRequest(requestData: Req): Promise<mongoose.Types.ObjectId | null> {
        let requestId;
        let cargo = undefined;
        if (requestData && requestData.cargo){
            cargo = requestData.cargo
        }
        if (requestData && requestData.requestStatus && requestData.date && requestData.user && requestData.trackingStatus) {
            requestId = await this.mongo.addRequest(new RequestClass(requestData.requestStatus, requestData.date, requestData.user, requestData.trackingStatus, cargo));
        }
        if (requestId) {
            printToConsole('[+] New request with id ' + requestId.toString() + ' saved.');
            return requestId
        } else {
            return null
        }
    }

    /**
     * calls findRequest() method of mongo.module, to find a request with a specific id
     * @param {mongoose.Types.ObjectId} id
     * @return {Req|null} request
     */
    async findRequestById(id: mongoose.Types.ObjectId): Promise<Req | null> {
        return this.mongo.findRequest({_id: id});
    }

    /**
     *  calls findRequests() method of mongo.module, to get all requests
     *  @return {Req[]} requests
     */
    async geteAllRequests(): Promise<Req[]> {
        return this.mongo.findRequests({});
    }

    /**
     * calls deleteRequest() method of mongo.module, to delete a request specified by id
     * @param {mongoose.Types.ObjectId} id
     * @return {Req|null} deleted req
     */
    async deleteRequest(id: mongoose.Types.ObjectId): Promise<Req | null> {
        return this.mongo.deleteRequest(id);
    }


    /**
     * calls deleteAllRequests() method of mongo.module, to delete all requests
     */
    async deleteAllRequests() {
        await this.mongo.deleteAllRequests()
            .then(() => {
                printToConsole("[-] Deleted all requests")
            })
            .catch(err => {
                printToConsole(err)
            })
    }

    async updateRequest(id: mongoose.Types.ObjectId, newReq: Req): Promise<Req | null> {
        return this.mongo.updateReq(id, newReq)
    }
}
