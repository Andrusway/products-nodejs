
import {Router} from 'express'
import {celebrate} from 'celebrate'
import {registerUserValidation} from '../validation/authValidation.js'
import {registerUser} from "../controllers/authController.js"


const router = Router();


router.post('/auth/register', celebrate(registerUserValidation), registerUser);

export default router;