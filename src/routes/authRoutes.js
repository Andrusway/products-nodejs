import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUserValidation,
  registerUserValidation,
} from '../validation/authValidation.js';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserValidation), registerUser);
router.post('/auth/login', celebrate(loginUserValidation), loginUser);

export default router;
