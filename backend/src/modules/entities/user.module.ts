import mongoose from "mongoose";
import {MongoModule} from "../mongo/mongo.module";
import {User} from "../../models/user.model";
import {EntityModule} from "./entity.module";
import {printToConsole} from "../util/util.module";

export class UserModule extends EntityModule {

    constructor(mongo: MongoModule) {
        super(mongo);
    }

    /**
     * calls addUser() from mongo.module to create a new User doc in the DB using the given values
     * pushes new id to Entities IDsArray and logs action on console
     * calues for a new User
     * @return userId : mongoose.Types.ObjectId |null if successful der userId is returned otherwise null
     * @param user
     */
    async createUser(user: User): Promise<mongoose.Types.ObjectId | null> {
        const userId: mongoose.Types.ObjectId | null = await this.mongo.addUser(user)
        printToConsole('[+] New user with id ' + userId + 'saved.');
        if (userId) {
            return userId;
        } else {
            return null
        }
    }

    /**
     * tells mongo.module to read all Users from DB
     * @return users : User[]
     */
    async getAllUsers(): Promise<User[]> {
        return await this.mongo.findUsers({});
    }

    /**
     * tells mongo.module to get the Shelf document with the given id
     * @param id : mongoose.Types.ObjectId
     * @return
     */
    getUserById(id: any): Promise<User| null> {
        return this.mongo.findUser({_id: id}).then(user => {
            printToConsole(user);
            return user;
        }).catch(err => {
            printToConsole(err);
            return null
        })
    }

    /**
     * tells mongo.module to get the Shelf document with the given json web token(jwt)
     * @param jwt : string
     * @return user : User
     */
    findUserByJWT(jwt: string): Promise<User | null> {
        return this.mongo.findUser({jwt: jwt})
    }


    /**
     * tells mongo.module to get the Shelf document with the given name from DB
     * @param username : string
     * @return user : User
     */
    getUserByName(username: string): Promise<User | null> {
        return this.mongo.findUser({name: username}).then(user => {
            printToConsole(user);
            return user;
        }).catch(err => {
            printToConsole(err);
            return null;
        });
    }

    /**
     * tells mongo.module to delete the User document with the given id from DB
     * @param id
     */
    async deleteUser(id: mongoose.Types.ObjectId): Promise<User | null> {
        const user: User | null = await this.mongo.deleteUser(id);
        printToConsole("[-] deleted user " + user)
        return user
    }

    /**
     * tells mongo.module to delete all User doc from DB
     * @return users : User[] | null
     */
    async deleteAllUsers(): Promise<User[] | null> {
        await this.mongo.deleteAllUsers().then(users => {
            return users;
        }).catch(err => {
            printToConsole(err)
            return null;
        })
        return null;
    }

    async updateUser(id: mongoose.Types.ObjectId, newUser: User): Promise< User | null> {
        const user: User | null = await this.mongo.updateUser(id, newUser)
        if (user) {
            return user;
        } else {
            return null
        }
    }

}
