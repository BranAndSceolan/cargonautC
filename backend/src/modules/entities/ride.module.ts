import {EntityModule} from "./entity.module";
import {MongoModule} from "../mongo/mongo.module";
import {Ride, RideClass} from "../../models/ride.model";
import mongoose from "mongoose";
import {printToConsole} from "../util/util.module";

/**
 * Module for rides, providing all ride functionalities
 *     for ride controller using methods of mongo module.
 */
export class RideModule extends EntityModule {
    constructor(mongo: MongoModule) {
        super(mongo);
    }

    /**
     * calls addRide() method of mongo.module, to create a new ride
     * @param {Ride}
     * @return {mongoose.Types.ObjectId|null} id for created ride
     */
    async createRide(rideData: Ride): Promise<mongoose.Types.ObjectId | null> {
        let rideId;
        if (rideData && rideData.date && rideData.origin && rideData.destination && rideData.title && rideData.description && rideData.numberOfFreeSeats && rideData.user && rideData.price && rideData.pendingReqs && rideData.accReqs) {
            rideId = await this.mongo.addRide(new RideClass(rideData.date, rideData.origin, rideData.destination, rideData.title, rideData.description, rideData.numberOfFreeSeats, rideData.price, rideData.user, rideData.pendingReqs, rideData.accReqs));
        } else if (rideData && rideData.date && rideData.origin && rideData.destination && rideData.title && rideData.description && rideData.numberOfFreeSeats && rideData.price && rideData.user) {
            rideId = await this.mongo.addRide(new RideClass(rideData.date, rideData.origin, rideData.destination, rideData.title, rideData.description, rideData.numberOfFreeSeats, rideData.price, rideData.user, undefined, undefined));
        } else if (rideData && rideData.date && rideData.origin && rideData.destination && rideData.title && rideData.description && rideData.numberOfFreeSeats && rideData.price && rideData.user && rideData.pendingReqs) {
            rideId = await this.mongo.addRide(new RideClass(rideData.date, rideData.origin, rideData.destination, rideData.title, rideData.description, rideData.numberOfFreeSeats, rideData.price, rideData.user, rideData.pendingReqs, undefined));
        } else if (rideData && rideData.date && rideData.origin && rideData.destination && rideData.title && rideData.description && rideData.numberOfFreeSeats && rideData.price && rideData.user && rideData.accReqs) {
            rideId = await this.mongo.addRide(new RideClass(rideData.date, rideData.origin, rideData.destination, rideData.title, rideData.description, rideData.numberOfFreeSeats, rideData.price, rideData.user, undefined, rideData.accReqs));
        }
        if (rideId) {
            printToConsole('[+] New ride with id ' + rideId.toString() + ' saved.');
            return rideId
        } else {
            return null
        }
    }

    /**
     * calls findRide() method of mongo.module, to find a ride with a specific id
     * @param {mongoose.Types.ObjectId} id
     * @return {Ride|null} ride
     */
    async findRideById(id: mongoose.Types.ObjectId): Promise<Ride | null> {
        return this.mongo.findRide({_id: id});
    }

    /**
     *  calls findRides() method of mongo.module, to get all rides
     *  @return {Ride[]} rides
     */
    async getAllRides(): Promise<Ride[]> {
        return this.mongo.findRides({});
    }

    /**
     * calls deleteRide() method of mongo.module, to delete a ride specified by id
     * @param {mongoose.Types.ObjectId} id
     * @return {Ride|null} deleted ride
     */
    async deleteRide(id: mongoose.Types.ObjectId): Promise<Ride | null> {
        return this.mongo.deleteRide(id);
    }


    /**
     * calls deleteAllRides() method of mongo.module, to delete all rides
     */
    async deleteAllRides() {
        await this.mongo.deleteAllRides()
            .then(() => {
                printToConsole("[-] Deleted all rides")
            })
            .catch(err => {
                printToConsole(err)
            })
    }

    async updateRide(id: mongoose.Types.ObjectId, newRide: Ride): Promise<Ride | null> {
        return this.mongo.updateRide(id, newRide)
    }

}
