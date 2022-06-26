import {Request, Response} from "express";
import {MongoModule} from "../modules/mongo/mongo.module";
import mongoose from "mongoose";
import {RequestModule} from "../modules/entities/request.module";
import {RequestClass, requestStatus, trackingStatus} from "../models/request.model";

/**
 * Controller for all requests, providing all functionalities e.g. (create, read, update, delete)
 *     for the request router using methods of request module.
 */
export class RequestController {
    requestModule: RequestModule;


    constructor(mongo: MongoModule) {
        this.requestModule = new RequestModule(mongo);
    }

    /**
     * calls createRequest() method of RequestModule, to create a new request
     * @param req
     * @param res
     */
    public create(req: Request, res: Response): void {
        if (req.body && req.body.date && req.body.user && req.body.cargo){
            let cargo = undefined
            if (req.body.cargo){
                cargo = req.body.cargo
            }

            this.requestModule.createRequest(new RequestClass(requestStatus.pending, req.body.date, req.body.user, trackingStatus.pending ,cargo)).then(result =>{
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(500).send("Internal Server Error (seems like the objects don't exist)")
                }
            });
        } else {
            res.status(400).send("Bad Request")
        }
    }

    public get(req: Request, res: Response) {
        const id = req.params.id;
        this.requestModule.findRequestById(new mongoose.Types.ObjectId(id)).then((result: any) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }
    /**
     *  get all requests
     * @param _req
     * @param res
     */
    public getAll(_req: Request, res: Response) {
        this.requestModule.geteAllRequests().then((result: any) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }


    /**
     * calls deleteRequest() method of evaluation.module, to delete a request specified by its id
     * @param req
     * @param res
     */
    public delete(req: Request, res: Response): void {
        const id: string | undefined = req.params.id;
        this.requestModule.deleteRequest(new mongoose.Types.ObjectId(id)).then((result: any) => {
            if (result) {
                res.status(200).send(result); //deleted Entity
            } else {
                res.status(500).send("Internal Server Error")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }

    public update(req: Request, res: Response): void {
        const id: string | undefined = req.params.id;
        if (req.body && req.body.date && req.body.user && req.body.cargo) {
            let status = undefined
            if(req.body.requestStatus){
                status = req.body.requestStatus
            }
            let tStatus = undefined
            if(req.body.trackingStatus){
                tStatus = req.body.trackingStatus
            }
            this.requestModule.updateRequest(new mongoose.Types.ObjectId(id), new RequestClass(status, req.body.date, req.body.user, tStatus, req.body.cargo)).then((result: any) => {
                if (result) {
                    res.status(200).send(result); //deleted Entity
                } else {
                    res.status(500).send("Internal Server Error")
                }
            }).catch(() => res.status(500).send("Internal Server Error"));
        }
    }
}
