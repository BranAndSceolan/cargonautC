import {EntityModule} from "./entity.module";
import {MongoModule} from "../mongo/mongo.module";
import {Evaluation, EvaluationClass} from "../../models/evaluation.model";
import mongoose from "mongoose";
import {printToConsole} from "../util/util.module";

/**
 * Module for evaluations, providing all label functionalities
 *     for evaluation controller using methods of mongo module.
 */
export class EvaluationModule extends EntityModule {
    constructor(mongo: MongoModule) {
        super(mongo);
    }

    /**
     * calls addeEvaluation() method of mongo.module, to create a new evaluation
     * @param {Evaluation}
     * @return {mongoose.Types.ObjectId|null} id for created evaluation
     */
    async createEvaluation(evaluationData: Evaluation): Promise<mongoose.Types.ObjectId | null> {
        let evaluationId;
        if (evaluationData && evaluationData.result && evaluationData.user && evaluationData.ride){
            evaluationId = await this.mongo.addEvaluation(new EvaluationClass(evaluationData.result, evaluationData.ride, evaluationData.user));
        }
        if (evaluationId) {
            printToConsole('[+] New evaluation with id ' + evaluationId.toString() + ' saved.');
            return evaluationId
        } else {
            return null
        }
    }

    /**
     * calls findEvaluation() method of mongo.module, to find an evaluation with a specific id
     * @param {mongoose.Types.ObjectId} id
     * @return {Evaluation|null} evaluation
     */
    async findEvaluationById(id: mongoose.Types.ObjectId): Promise<Evaluation | null> {
        return this.mongo.findEvaluation({_id: id});
    }

    async findEvaluationsByDriver(userId: mongoose.Types.ObjectId): Promise <Evaluation[]>{
        return this.mongo.findEvaluations({user: userId})
    }
    async findNumberOfEvaluationsByDriver(userId: mongoose.Types.ObjectId): Promise <number>{
        return this.mongo.findEvaluationsNumber({user: userId})
    }

    /**
     *  calls findEvaluations() method of mongo.module, to get all evaluations
     *  @return {Evaluation[]} evaluations
     */
    async getAllEvaluations(): Promise<Evaluation[]> {
        return this.mongo.findEvaluations({});
    }

    /**
     * calls deleteEvaluation() method of mongo.module, to delete an evaluation specified by id
     * @param {mongoose.Types.ObjectId} id
     * @return {Evaluation|null} deleted evaluation
     */
    async deleteEvaluation(id: mongoose.Types.ObjectId): Promise<Evaluation | null> {
        return this.mongo.deleteEvaluation(id);
    }


    /**
     * calls deleteAllEvaluations() method of mongo.module, to delete all evaluations
     */
    async deleteAllEvaluations() {
        await this.mongo.deleteAllEvaluations()
            .then(() => {
                printToConsole("[-] Deleted all evaluations")
            })
            .catch(err => {
                printToConsole(err)
            })
    }

}
