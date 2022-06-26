import {Request, Response} from "express";
import {MongoModule} from "../modules/mongo/mongo.module";
import mongoose from "mongoose";
import {VehicleModule} from "../modules/entities/vehicle.module";
import {VehicleClass} from "../models/vehicle.model";

/**
 * Controller for all labelIds, providing all functionalities e.g. (create, read, update, delete)
 *     for the label router using methods of label module.
 */
export class VehicleController {
    vehicleModule: VehicleModule;


    constructor(mongo: MongoModule) {
        this.vehicleModule = new VehicleModule(mongo);
    }

    /**
     * calls createVehicle() method of VehicleModule, to create a new Vehicle
     * @param req
     * @param res
     */
    public create(req: Request, res: Response): void {
        if ( req.body && req.body.type && req.body.numberOfSeats && req.body.notes){
            let width: number | undefined = undefined;
            let height: number | undefined = undefined;
            let length: number | undefined = undefined;
            if (req.body.spaceWidth && typeof req.body.spaceWidth == 'number'){
                width = req.body.spaceWidth
            }
            if (req.body.spaceHeight && typeof req.body.spaceHeight == 'number'){
                height = req.body.spaceHeight
            }
            if (req.body.spaceLength && typeof req.body.spaceLength == 'number'){
                length = req.body.spaceLength
            }
            this.vehicleModule.createVehicle(new VehicleClass(req.body.type, req.body.numberOfSeats, req.body.notes, width, height, length)).then( result =>{
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
        this.vehicleModule.findVehicleById(new mongoose.Types.ObjectId(id)).then((result: any) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }
    /**
     *  get all vehicles
     * @param _req
     * @param res
     */
    public getAll(_req: Request, res: Response) {
        this.vehicleModule.getAllVehicles().then((result: any) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }


    /**
     * calls deleteVehicle() method of vehicle.module, to delete a vehicle specified by id
     * @param req
     * @param res
     */
    public delete(req: Request, res: Response): void {
        const id: string | undefined = req.params.id;
        this.vehicleModule.deleteVehicle(new mongoose.Types.ObjectId(id)).then((result: any) => {
            if (result) {
                res.status(200).send(result); //deleted Entity
            } else {
                res.status(500).send("Internal Server Error")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }

}
