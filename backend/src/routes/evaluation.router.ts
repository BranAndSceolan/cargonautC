import express from 'express'
import {Request, Response} from 'express'
import {evaluationController} from '../controllers';
import {authModule} from "../modules/auth";

export const router = express.Router({
    strict: true
})

/**
 * Evaluation Routes
 */

// POST Routes
router.post('/create', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => evaluationController.create(req, res))
})

// GET Routes
router.get('/getAll', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => evaluationController.getAll(req,res))
})

router.get('/findById/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => evaluationController.get(req,res))
})

// DELETE Routes
router.delete('/delete/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => evaluationController.delete(req, res))
})

