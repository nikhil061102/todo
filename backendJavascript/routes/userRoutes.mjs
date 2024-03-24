import express from 'express';
import userRoutes from '../controllers/userControllers.mjs';
const { registerUser, authUser } = userRoutes;
import userValidators from "../middleware/validator.mjs";
const { validateSignup, validateLogin } = userValidators;

const router = express.Router();

router.route("/signup").post(validateSignup, registerUser);
router.route('/login').post(validateLogin, authUser);

export default router;