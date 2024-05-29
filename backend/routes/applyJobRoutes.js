import express from 'express';
import { requireSignIn } from '../middlewares/authMiddlewares.js';
import { createApplyJobController, editApplyJobController, getApplyJobsByCompanyController, getApplyJobsByUserController } from '../controllers/applyJobController.js';

const router = express.Router();

//create
router.post('/apply-job/:_id', requireSignIn, createApplyJobController);
//update status
router.put('/update/:_id', requireSignIn, editApplyJobController);

//get jobs
router.get('/get-apply', requireSignIn, getApplyJobsByUserController);
router.get('/company-apply', requireSignIn, getApplyJobsByCompanyController);

export default router;
