import {Request, Response} from "express";
import { User, UserClass} from "../models/user.model";
import {MongoModule} from "../modules/mongo/mongo.module";
import {UserModule} from "../modules/entities/user.module";
import {printToConsole} from "../modules/util/util.module";
import mongoose from "mongoose";
import {evaluationController} from "./index";


/** USER CONTROLLER
 * Class for actions triggered on User docs in the DB.
 * The functions are intended to be triggered via Router an therefore accept HTTP- Requests and Responses as parameter.
 */
export class UserController {
    userModule: UserModule;

    constructor(mongo: MongoModule) {
        this.userModule = new UserModule(mongo)
    }

    /** CREATE
     * Creates and adds an User document to the DB.
     * @param req : e.Request
     * has to contain an Object in its body that fulfils the requirements of the User Interface (see: user.model.ts)

     * @param res : e.Response
     * A HTTP-Response which will be send containing a status code, and,
     * if successful, the id of the newly created User document.
     */
    public create(req: Request, res: Response): void {
        const userName = req.body.name
        if (!userName || userName.trim() == ""){
            res.status(400).send("Username missing")
            return
        }
        const password = req.body.password
        if (!password || password.trim() == ""){
            res.status(400).send("Password missing")
            return
        }
        const description = req.body.description
        if(!description) {
            res.status(400).send("Description missing")
            return
        }
        const birthdate = req.body.birthdate
        if (!birthdate || !( typeof birthdate == 'string') || birthdate.trim() == ""){
            res.status(400).send("Birthdate missing")
            return
        }
        const email = req.body.email
        if (!email || email.trim() == ""){
            res.status(400).send("Password missing")
            return
        }
        let vehicleIds: Array<mongoose.Types.ObjectId> | undefined = undefined
        if (req.body.vehicles){
            vehicleIds = req.body.vehicles
        }

        this.userModule.createUser(
                new UserClass(
                    userName.trim(),
                    new Date(birthdate.trim()),
                    email.trim(),
                    password.trim(),
                    description,
                    vehicleIds,
                    undefined
                )
        ).then((id: mongoose.Types.ObjectId | null) => {
            if (id) {
                res.status(201).send(id)
            } else {
                console.log(res)
                res.sendStatus(500)
            }
        }).catch((err: any) => {
            if (err.name === "ValidationError") {
                res.status(400).send("Please fill out the required fields with valid values.");
            }
            res.sendStatus(500)
            printToConsole(`Something went wrong adding an User in crud-action create.\nERROR: ${err}`)
        })
    }

    /** ALL
     * Finds all User documents in the DB and returns them
     * needs no further params or body
     * @param _req
     * @param res : e.Response
     * Returns a HTTP-Response containing a statuscode and, if successful, an array of all
     * Users saved in the DB in its body
     */
    public getAllUsers(_req: Request, res: Response): void {
        this.userModule.getAllUsers().then((users: User[]) => {
            res.status(200).send(users);
        }).catch((err: Error) => {
            res.sendStatus(500)
            printToConsole(`Something went wrong getting all users in crud-action read.\nERROR: ${err}`)
        })
    }



    /** GETBYNAME
     * Finds and returns an User doc
     * @param req : e.Request
     * HTTP-Request containing the id of the wanted User document in its params (in the URL)
     * @param res : e.Response
     * HTTP-Response containing a status code and if successful, the User in its body
     */
    public getByName(req: Request, res: Response): void {
        const userName = req.params.name
        if (!userName || userName == ""){
            res.status(400).send("Username missing")
            return
        }
        this.userModule.getUserByName(userName).then((user: User | null) => {
            if (user) {
                res.status(200).send(user)
            } else {
                res.sendStatus(500)
            }
        }).catch((err) => {
            res.sendStatus(500)
            printToConsole(err)
        })
    }

    /**
     * DELETE
     * deletes an user with an specific id from database
     * @param req
     * HTTP-Request containing the id of User document in the params (in the URL)
     * @param res
     * HTTP-Request containing a status code and if successful, the deleted user in its body
     */
    public delete(req: Request, res: Response): void {
        this.userModule.deleteUser(new mongoose.Types.ObjectId(req.params.id)).then((user: User | null) => {
            if (user) {
                res.status(200).send(user);
            } else {
                res.sendStatus(500);
            }
        })

    }

    /**
     * DELETE ALL USERS
     * deletes all users from database
     * @param req
     * @param res
     * HTTP-Response containing a status code an, if successful, all users, which were delete
     */
    public deleteAllUsers(res: Response): void {
        this.userModule.deleteAllUsers().then((users: User[] | null) => {
            if (users) {
                res.status(200).send(users);
            } else {
                res.sendStatus(500);
            }
        })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const userName = req.body.name
        if (!req.params.id ) {
            res.status(400).send("id missing")
            return
        }
        if (!userName || userName.trim() == "") {
            res.status(400).send("Username missing")
            return
        }
        const password = req.body.password
        if (!password || password.trim() == "") {
            res.status(400).send("Password missing")
            return
        }
        const description = req.body.description
        if(!description) {
            res.status(400).send("Description missing")
            return
        }
        const birthdate = req.body.birthdate
        if (!birthdate || !(typeof birthdate == 'string') || birthdate.trim() == "") {
            res.status(400).send("Birthdate missing")
            return
        }
        const email = req.body.email
        if (!email || email.trim() == "") {
            res.status(400).send("Password missing")
            return
        }
        let newEval = 0;
        if(req.body.averageEvalOfRides){
            newEval = req.body.averageEvalOfRides
        }
        let vehicleIds: Array<mongoose.Types.ObjectId> | undefined = undefined
        if (req.body.vehicles) {
            vehicleIds = req.body.vehicles
        }

        const user: User | null = await this.userModule.getUserById(req.params.id)
        let avgEval = 0;
        if( user?.averageEvalOfRides) {
            avgEval = user.averageEvalOfRides
        }
        if (user && user._id) {
            const evalsN: number = await evaluationController.evaluationModule.findNumberOfEvaluationsByDriver(user._id)
            avgEval = ((avgEval * evalsN) + newEval) / (evalsN + 1)
        } else{
            res.status(500).send("Sure that is a valid user?")
        }
        if (user?._id) {
            this.userModule.updateUser(
                user?._id,
                new UserClass(
                    userName.trim(),
                    new Date(birthdate.trim()),
                    email.trim(),
                    password.trim(),
                    description,
                    vehicleIds,
                    avgEval
                )
            ).then((result: User | null) => {
                printToConsole(result)
                if (result) {
                    res.status(201).send(result)
                }
            }).catch((err: Error) => {
                res.sendStatus(500)
                printToConsole(`Something went wrong updating an User. \nERROR: ${err}`)
            })
        }
    }

}
