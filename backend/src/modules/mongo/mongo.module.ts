import mongoose, {connect} from 'mongoose';
import {dbName} from '../../config/config.json';
import config from 'config'
import * as schemes from "../../models/index"
import {Vehicle} from "../../models/vehicle.model";
import {User} from "../../models/user.model";
import {Ride} from "../../models/ride.model";
import {Evaluation} from "../../models/evaluation.model";
import {Req} from "../../models/request.model"

/**
 * Basic functions for interacting with MongoDB
 */
export class MongoModule {

    /**
     * Connect to mongo database
     */
    async connectToMongo() {
        return connect(config.get('Database.mongoURL'), {dbName: dbName, serverSelectionTimeoutMS: 5000})
    }

    async addVehicle(vehicleData: Vehicle): Promise < mongoose.Types.ObjectId | null >{
        const vehicle = new schemes.vehicleModel(vehicleData);
        const i = await vehicle.save();
        return i._id
    }

    async addUser(userData: User): Promise < mongoose.Types.ObjectId | null >{
        const user = new schemes.userModel(userData);
        const i = await user.save();
        return i._id
    }

    async addRide(rideData: Ride): Promise < mongoose.Types.ObjectId | null >{
        const ride = new schemes.rideModel(rideData);
        const i = await ride.save();
        return i._id
    }

    async addEvaluation(evalData: Evaluation): Promise < mongoose.Types.ObjectId | null >{
        const evaluation = new schemes.evaluationModel(evalData);
        const i = await evaluation.save();
        return i._id
    }

    async addRequest(requestData: Req): Promise < mongoose.Types.ObjectId | null >{
        const request = new schemes.requestModel(requestData);
        const i = await request.save();
        return i._id
    }

    async deleteVehicle(id: mongoose.Types.ObjectId): Promise<Vehicle | null> {
        return schemes.vehicleModel.findByIdAndDelete({_id: id});
        }

    async deleteUser(id: mongoose.Types.ObjectId): Promise<User | null> {
        return schemes.userModel.findByIdAndDelete(id);
    }

    async deleteRide(id: mongoose.Types.ObjectId): Promise<Ride | null> {
        return schemes.rideModel.findByIdAndDelete(id);
    }

    async deleteEvaluation(id: mongoose.Types.ObjectId): Promise<Evaluation | null> {
        return schemes.evaluationModel.findByIdAndDelete(id);
    }

    async deleteRequest(id: mongoose.Types.ObjectId): Promise<Req | null> {
        return schemes.requestModel.findByIdAndDelete(id);
    }

    async deleteAllVehicles() {
        return schemes.vehicleModel.deleteMany({})
    }

    async deleteAllUsers() {
        return schemes.userModel.deleteMany({})
    }

    async deleteAllRides() {
        return schemes.rideModel.deleteMany({})
    }

    async deleteAllEvaluations() {
        return schemes.evaluationModel.deleteMany({})
    }

    async deleteAllRequests() {
        return schemes.requestModel.deleteMany({})
    }

    async findVehicle(filter: any): Promise<Vehicle | null> {
        return schemes.vehicleModel.findOne(filter);
    }

    async findUser(filter: any): Promise<User | null> {
        return schemes.userModel.findOne(filter);
    }

    async findRide(filter: any): Promise<Ride | null> {
        return schemes.rideModel.findOne(filter);
    }

    async findEvaluation(filter: any): Promise<Evaluation | null> {
        return schemes.evaluationModel.findOne(filter);
    }

    async findRequest(filter: any): Promise<Req | null> {
        return schemes.requestModel.findOne(filter);
    }

    async findVehicles(filter: any): Promise<Vehicle[]> {
        return schemes.vehicleModel.find(filter);
    }

    async findUsers(filter: any): Promise<User[]> {
        return schemes.userModel.find(filter);
    }

    async findRides(filter: any): Promise<Ride[]> {
        return schemes.rideModel.find(filter);
    }

    async findEvaluations(filter: any): Promise<Evaluation[]> {
        return schemes.evaluationModel.find(filter);
    }

    async findRequests(filter: any): Promise<Req[]> {
        return schemes.requestModel.find(filter);
    }

    async updateUser(id: mongoose.Types.ObjectId, newUser: User): Promise<User | null> {
        return schemes.userModel.findOneAndUpdate({_id: id}, {
            $set: {
                name: newUser.name,
                birthdate: newUser.birthdate,
                email: newUser.email,
                password: newUser.password,
                description: newUser.description,
                averageEvalOfRides: newUser.averageEvalOfRides,
                vehicles: newUser.vehicles
            }
        }, {new: true})
    }

    async updateRide(id: mongoose.Types.ObjectId, newRide: Ride): Promise<Ride | null> {
        return schemes.rideModel.findOneAndUpdate({_id: id}, {
            $set: {
                date: newRide.date,
                origin : newRide.origin,
                destinantion: newRide.destination,
                title: newRide.title,
                description: newRide.description,
                numberOfFreeSeats: newRide.numberOfFreeSeats,
                user: newRide.user,
                price: newRide.price,
                pendingReqs: newRide.pendingReqs,
                accReqs: newRide.accReqs
            }
        }, {new: true})
    }

    async updateReq(id: mongoose.Types.ObjectId, newReq: Req): Promise<Req | null> {
        return schemes.requestModel.findOneAndUpdate({_id: id}, {
            $set: {
                requestStatus: newReq.requestStatus,
                date : newReq.date,
                user : newReq.user,
                cargo: newReq.cargo,
                trackingStatus: newReq.trackingStatus
            }
        }, {new: true})
    }

    async findEvaluationsNumber(filter: any): Promise<number>{
        return schemes.evaluationModel.find(filter).count()
    }
}

