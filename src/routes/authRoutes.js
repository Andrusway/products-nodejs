import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUserValidation,
  registerUserValidation,
} from '../validation/authValidation.js';
import {
  loginUser,
  registerUser,
  logoutUser,
} from '../controllers/authController.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserValidation), registerUser);
router.post('/auth/login', celebrate(loginUserValidation), loginUser);
router.post('/auth/logout', logoutUser);

export default router;
