import express from 'express';
import { getSingleDataCompany, loginController, registerController, updateCompanyController } from '../controllers/companyController.js';
import { requireSignIn } from '../middlewares/authMiddlewares.js';
import { upload } from '../middlewares/uploadImage.js';

const router = express.Router();

//register company
router.post('/register', registerController);
//login company
router.post('/login', loginController);

//update company
router.put('/update-profile', upload.fields([{ name: 'profileImage', maxCount: 1 }]), requireSignIn, updateCompanyController);

//get
router.get('/get-single', requireSignIn, getSingleDataCompany);

//protected company route auth
router.get('/company-auth', requireSignIn, (req, res) => {
  res.status(200).send({ companyOk: true });
});
export default router;
