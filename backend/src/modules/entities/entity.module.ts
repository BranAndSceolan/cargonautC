import {MongoModule} from "../mongo/mongo.module";

/**
 * Parent class for all the entities' modules.
 */
export class EntityModule {

    mongo: MongoModule;

    constructor(mongo: MongoModule) {
        this.mongo = mongo;
    }

}
