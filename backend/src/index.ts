import express from "express";
import {Application, Request, Response} from "express";
import * as rl from "express-rate-limit"
import * as path from "path";
import {PORT} from "./config/config.json";
import cors from 'cors';
import {MongoModule} from "./modules/mongo/mongo.module";
import config from "config";
import {
    evalRouter,
    rideRouter,
    requestRouter,
    userRouter,
    vehicleRouter
} from "./routes/index"
import session from "express-session";
const crypto = require('crypto')
const csrf = require('csrf')

if (!config.get('testWithOutDocker')) {
    const mongo: MongoModule = new MongoModule();
    mongo.connectToMongo().then(mongoose => {
        console.log(`Connected to MongoDB at ${config.get('Database.mongoURL')}, database: ${mongoose.connection?.db.databaseName}\n`)
    }).catch((err: never) => {
        console.log(`Error: Couldn't establish connection to MongoDB at ${config.get('Database.mongoURL')}`)
        console.log(`Is your Docker daemon running?`)
        console.log(`=> sudo systemctl start docker`)
        console.log(`Is your database running?`)
        console.log(`=> docker start cargonaut_mongo`)
        console.log(err)
        process.exit()
    })
}
// add "signInName" to session store
declare module "express-session" {
    interface Session {
        signInName: string;
    }
}


// Boot express
export const app: Application = express();
app.use(express.urlencoded({extended: false}));
app.use(csrf({cookie: true}))
app.use(rl.rateLimit({
    windowMs: 60*1000, // 1 minute
    max: 6
}))

if (!config.get('disableAuth')) {
    app.use(session({
        resave: false, // save session even if not modified
        saveUninitialized: true, // save session even if not used
        rolling: true, // forces cookie set on every response needed to set expiration
        secret: crypto.randomInt(0, 1000000), // encrypt session-id in cookie using "secret" as modifier
        name: "cargonaut_cookie", // name of the cookie set is set by the server
        cookie: {maxAge  : 60 * 60 * 1000 }
    }))
} else {
    app.use(session({
        resave: false, // save session even if not modified
        saveUninitialized: true, // save session even if not used
        rolling: true, // forces cookie set on every response needed to set expiration
        secret: crypto.randomInt(0, 1000000), // encrypt session-id in cookie using "secret" as modifier
        name: "cargonaut_cookie", // name of the cookie set is set by the server
        cookie: {secure: true} // Only send cookie using https
    }))
}

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({
    extended: true
}));

// Application routing
app.use('/user', userRouter)
app.use('/eval', evalRouter)
app.use('/ride', rideRouter)
app.use('/req', requestRouter)
app.use('/vehicle', vehicleRouter)

app.get('/', (_req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname, "/public/index.html"))
});

// Start server
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
