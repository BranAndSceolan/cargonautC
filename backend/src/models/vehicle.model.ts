import mongoose from "mongoose";


/** Evaluation Interface
 */
export interface Vehicle {
    "_id"?: mongoose.Types.ObjectId,
    type: vehicleType;
    spaceWidth?: number,
    spaceHeight?: number,
    spaceLength?: number,
    numberOfSeats: number,
    notes: string
}

/** Evaluation Class
 */

export class VehicleClass implements Vehicle {
    _id?: mongoose.Types.ObjectId;
    type: vehicleType;
    spaceWidth?: number;
    spaceHeight?: number;
    spaceLength?: number;
    numberOfSeats: number;
    notes: string;

    constructor(type: vehicleType, numberOfSeats: number, notes: string, spaceWidth?: number, spaceHeight?: number, spaceLength?: number, _id?: mongoose.Types.ObjectId) {
        this._id = _id;
        this.notes = notes;
        this.type = type;
        this.spaceWidth = spaceWidth;
        this.spaceHeight = spaceHeight;
        this.spaceLength = spaceLength;
        this.numberOfSeats = numberOfSeats;
    }

}

export enum vehicleType{
    pickupTruck = 'pick up truck',
    carWithHorseTrailer = 'car with horse trailer',
    carWithBikeRack = 'car with bike rack',
    standardCar = 'standard car',
    truck = 'truck',
    caravan = 'caravan',
    carWithOpenTrailer = 'car with open trailer',
    carWithCoveredTrailer = 'car with covered trailer',
    bus = 'bus',
    motorcycle = 'motorcycle',
    other = 'other'
}
