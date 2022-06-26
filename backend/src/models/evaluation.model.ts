import mongoose from "mongoose";


/** Evaluation Interface
 */
export interface Evaluation {
    "_id"?: mongoose.Types.ObjectId,
    // Note that result may only be within a range of 0 to 5
    "result": number,
    "ride": mongoose.Types.ObjectId,
    "user": mongoose.Types.ObjectId
}

/** Evaluation Class
 */

export class EvaluationClass implements Evaluation {
    _id?: mongoose.Types.ObjectId;
    result: number;
    ride: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;

    constructor(result: number, ride: mongoose.Types.ObjectId, user: mongoose.Types.ObjectId, _id?: mongoose.Types.ObjectId) {
        this._id = _id;
        this.result = result;
        this.ride = ride;
        this.user = user;
    }

}
