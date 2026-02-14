import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUserValidation,
  registerUserValidation,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/authValidation.js';
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshSession,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserValidation), registerUser);
router.post('/auth/login', celebrate(loginUserValidation), loginUser);
router.post('/auth/logout', logoutUser);
router.post('/auth/refresh', refreshSession);
router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
router.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);

export default router;
