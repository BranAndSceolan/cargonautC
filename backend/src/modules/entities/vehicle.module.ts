import {EntityModule} from "./entity.module";
import {MongoModule} from "../mongo/mongo.module";
import {Vehicle, VehicleClass} from "../../models/vehicle.model";
import mongoose from "mongoose";
import {printToConsole} from "../util/util.module";

/**
 * Module for labelIds, providing all label functionalities
 *     for label controller using methods of mongo module.
 */
export class VehicleModule extends EntityModule {
    constructor(mongo: MongoModule) {
        super(mongo);
    }

    /**
     * calls addLabel() method of mongo.module, to create a new label with name and colour
     * @param {Vehicle}
     * @return {mongoose.Types.ObjectId|null} id for created label
     */
    async createVehicle(vehicleData: Vehicle): Promise<mongoose.Types.ObjectId | null> {
        let vehicleId;
        if (vehicleData && vehicleData.type && vehicleData.numberOfSeats && vehicleData.notes){
            let width: number | undefined = undefined;
            let height: number | undefined = undefined;
            let lenght: number | undefined = undefined;
            if (vehicleData.spaceWidth){
                width = vehicleData.spaceWidth
            }
            if (vehicleData.spaceHeight){
                height = vehicleData.spaceHeight
            }
            if (vehicleData.spaceLength){
                lenght = vehicleData.spaceLength
            }
            vehicleId = await this.mongo.addVehicle(new VehicleClass(vehicleData.type, vehicleData.numberOfSeats, vehicleData.notes, width, height, lenght));
        }
        if (vehicleId) {
            printToConsole('[+] New vehicle with id ' + vehicleId.toString() + ' saved.');
            return vehicleId
        } else {
            return null
        }
    }

    /**
     * calls findVehicle() method of mongo.module, to find a vehicle with specific id
     * @param {mongoose.Types.ObjectId} id
     * @return {Vehicle|null} label
     */
    async findVehicleById(id: mongoose.Types.ObjectId): Promise<Vehicle | null> {
        return this.mongo.findVehicle({_id: id});
    }

    /**
     *  calls getAllVehicles() method of mongo.module, to get all vehicles
     *  @return {Vehicle[]} Vehicles
     */
    async getAllVehicles(): Promise<Vehicle[]> {
        return this.mongo.findVehicles({});
    }

    /**
     * calls deleteVehicle() method of mongo.module, to delete a vehicle specified by id
     * @param {mongoose.Types.ObjectId} id
     * @return {Vehicle|null} deleted vehicle
     */
    async deleteVehicle(id: mongoose.Types.ObjectId): Promise<Vehicle | null> {
        return this.mongo.deleteVehicle(id);
    }


    /**
     * calls deleteAllVehicles() method of mongo.module, to delete all vehicles
     */
    async deleteAllLabels() {
        await this.mongo.deleteAllVehicles()
            .then(() => {
                printToConsole("[-] Deleted all vehicles")
            })
            .catch(err => {
                printToConsole(err)
            })
    }

}
