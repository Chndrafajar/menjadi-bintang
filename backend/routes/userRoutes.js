import express from 'express';
import { getSingleDataUser, loginController, registerController, testController, updateUserController } from '../controllers/userController.js';
import { requireSignIn } from '../middlewares/authMiddlewares.js';
import { upload } from '../middlewares/uploadImage.js';

const router = express.Router();

//register user
router.post('/register', registerController);

//login user
router.post('/login', loginController);

//update user
router.put('/update-profile', upload.fields([{ name: 'profileImage', maxCount: 1 }]), requireSignIn, updateUserController);

//test routes
router.get('/get-single', requireSignIn, getSingleDataUser);
router.get('/test', requireSignIn, testController);
//protected User route auth
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ userOk: true });
});

export default router;
