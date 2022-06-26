import {MongoModule} from "../modules/mongo/mongo.module";
import {VehicleController} from "./vehicle.controller";
import {UserController} from "./user.controller";
import {RideController} from "./ride.controller";
import {EvaluationController} from "./evalulation.controller";
import {RequestController} from "./request.controller";

const mongo: MongoModule = new MongoModule();
export const vehicleController = new VehicleController(mongo)
export const userController = new UserController(mongo)
export const rideController = new RideController(mongo)
export const evaluationController = new EvaluationController(mongo)
export const requestController = new RequestController(mongo)
