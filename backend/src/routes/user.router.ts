import express from 'express'
import {Request, Response} from 'express'
import {userController} from '../controllers';
import {authModule} from "../modules/auth";

export const router = express.Router({
    strict: true
})

/**
 * User Routes
 */

router.post("/create", (req: express.Request, res: express.Response) => {
        authModule.register(req, res)
});

router.post("/login", (req: express.Request, res: express.Response) => {
    authModule.login(req, res)
});

router.post("/logout", (req: express.Request, res: express.Response) => {
    authModule.checkLogin(req, res, () => authModule.logOut(req, res))
});

/* // POST Routes
router.post('/create', (req: Request, res: Response) => {
     userController.create(req, res)
})
*/

router.post('/update/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => userController.update(req, res))
})

// GET Routes
router.get('/getAll', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => userController.getAllUsers(req,res))
})

router.get('/getByName/:name', (req: Request, res: Response) => {
   authModule.checkLogin(req, res, () => userController.getByName(req,res))
})

// DELETE Routes
router.delete('/delete/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => userController.delete(req, res))
})

