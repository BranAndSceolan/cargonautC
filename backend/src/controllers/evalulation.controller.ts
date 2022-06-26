import {Request, Response} from "express";
import {MongoModule} from "../modules/mongo/mongo.module";
import mongoose from "mongoose";
import {EvaluationModule} from "../modules/entities/evaluation.module";
import {EvaluationClass} from "../models/evaluation.model";

/**
 * Controller for all evaluations, providing all functionalities e.g. (create, read, update, delete)
 *     for the ecaluation router using methods of evaluation module.
 */
export class EvaluationController {
    evaluationModule: EvaluationModule;


    constructor(mongo: MongoModule) {
        this.evaluationModule = new EvaluationModule(mongo);
    }

    /**
     * calls createEvaluation() method of EvaluationModule, to create a new evaluation
     * @param req
     * @param res
     */
    public create(req: Request, res: Response): void {
        if (req.body && req.body.result && (req.body.result <= 5) && (req.body.result >= 0) && req.body.ride && req.body.user){

            this.evaluationModule.createEvaluation(new EvaluationClass(req.body.result, req.body.ride, req.body.user)).then(result =>{
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
        this.evaluationModule.findEvaluationById(new mongoose.Types.ObjectId(id)).then((result: any) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }
    /**
     *  get all evaluatiions
     * @param _req
     * @param res
     */
    public getAll(_req: Request, res: Response) {
        this.evaluationModule.getAllEvaluations().then((result: any) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }


    /**
     * calls deleteEvaluation() method of evaluation.module, to delete an evaluation specified by its id
     * @param req
     * @param res
     */
    public delete(req: Request, res: Response): void {
        const id: string | undefined = req.params.id;
        this.evaluationModule.deleteEvaluation(new mongoose.Types.ObjectId(id)).then((result: any) => {
            if (result) {
                res.status(200).send(result); //deleted Entity
            } else {
                res.status(500).send("Internal Server Error")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }

}
