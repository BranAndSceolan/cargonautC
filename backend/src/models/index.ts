import mongoose from "mongoose";
import * as schemes from "../modules/mongo/mongo.schemes";
import {Vehicle} from "./vehicle.model";
import {User} from "./user.model";
import {Ride} from "./ride.model";
import {Req} from "./request.model";
import {Evaluation} from "./evaluation.model";

// create a ItemModule with specific itemSchema
export const userModel = mongoose.model<User>('User', schemes.userSchema)

// create a labelModel with specific labelSchema
export const vehicleModel = mongoose.model<Vehicle>('Vehicle', schemes.vehicleSchema)

// create a positionModel with specific positionSchema
export const rideModel = mongoose.model<Ride>('Ride', schemes.rideSchema)

// create roomModel with specific roomSchema
export const requestModel = mongoose.model<Req>('Request', schemes.requestSchema)

// create a shelfModel with specific shelfSchema
export const evaluationModel = mongoose.model<Evaluation>('Evaluation', schemes.evaluationSchema);
