import { Router } from "express";
import authCtl from "../controllers/authController.js";

const authRouter=Router();

authRouter.get('/login',authCtl.loginpage);
authRouter.get('/signup',authCtl.signuppage);
authRouter.post('/signup',authCtl.handleSignup);

export default authRouter;