import express from 'express'
import {Request, Response} from 'express'
import {requestController} from '../controllers';
import {authModule} from "../modules/auth";

export const router = express.Router({
    strict: true
})

/**
 * Request Routes
 */

// POST Routes
router.post('/create', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => requestController.create(req, res))
})

router.post('/update/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => requestController.update(req, res))
})

// GET Routes
router.get('/getAll', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => requestController.getAll(req,res))
})

router.get('/findById/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => requestController.get(req,res))
})

// DELETE Routes
router.delete('/delete/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => requestController.delete(req, res))
})

