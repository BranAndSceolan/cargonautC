import mongoose from "mongoose";


/** Request Interface
 */
export interface Req {
    "_id"?: mongoose.Types.ObjectId,
    "requestStatus": requestStatus
    "date": string,
    "user": mongoose.Types.ObjectId,
    "cargo"?: string,
    "trackingStatus": trackingStatus
}

/** Request Class
 */

export class RequestClass implements Req {
    _id?: mongoose.Types.ObjectId;
    requestStatus: requestStatus;
    user: mongoose.Types.ObjectId;
    date: string;
    cargo?: string;
    trackingStatus: trackingStatus;

    constructor(requestStatus: requestStatus, date: string, user: mongoose.Types.ObjectId,trackingStatus: trackingStatus,  cargo?: string, _id?: mongoose.Types.ObjectId) {
        this._id = _id;
        this.requestStatus = requestStatus;
        this.date = date;
        this.user = user;
        this.cargo = cargo
        this.trackingStatus = trackingStatus;
    }

}

export enum requestStatus {
    accepted = 'accepted',
    pending = 'pending',
    denied = 'denied'
}

export enum trackingStatus{
    // waiting for passengers or cargo
    pending = 'pending',
    departed = 'departed',
    arrived = 'arrived'
}
