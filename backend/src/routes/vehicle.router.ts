import express from 'express'
import { Request, Response} from 'express'
import {vehicleController} from '../controllers';
import {authModule} from "../modules/auth";


export const router = express.Router({
    strict: true
})

/**
 * Vehicle Routes
 */

// POST Routes
router.post('/create', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => vehicleController.create(req, res))
})

// GET Routes
router.get('/getAll', (req: Request, res: Response) => {
    authModule.checkLogin(req, res,() => vehicleController.getAll(req, res))
})

router.get('/findById/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => vehicleController.get(req, res))
})

// DELETE Routes
router.delete('/delete/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => vehicleController.delete(req, res))
})
