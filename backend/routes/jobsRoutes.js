import express from 'express';
import { requireSignIn } from '../middlewares/authMiddlewares.js';
import { upload } from '../middlewares/uploadImage.js';
import {
  addJobController,
  deleteJobsController,
  editJobController,
  getAllJobsController,
  getJobsByCategory,
  getJobsByLocation,
  getJobsByTipeJobs,
  getJobsController,
  getSingleDataJobsId,
  getSingleJobsSlug,
  searchJobsController,
} from '../controllers/jobsController.js';

const router = express.Router();

//add job
router.post('/add', upload.fields([{ name: 'thumbnail', maxCount: 1 }]), requireSignIn, addJobController);

//edit
router.put('/edit/:jobId', upload.fields([{ name: 'thumbnail', maxCount: 1 }]), requireSignIn, editJobController);

//delete
router.delete('/delete/:jobId', deleteJobsController);

//get
router.get('/get', requireSignIn, getJobsController);
router.get('/get-slug/:slug', getSingleJobsSlug);
router.get('/get-id/:jobId', getSingleDataJobsId);
router.get('/get-all', getAllJobsController);
router.get('/get-category/:categoryJob', getJobsByCategory);
router.get('/get-location/:location', getJobsByLocation);
router.get('/get-tipeJob/:tipeJob', getJobsByTipeJobs);
router.get('/search/:keyword', searchJobsController);

export default router;
