import { Router } from "express";
import proctl from "../controllers/proctl.js";
import authRouter from "./authRouter.js";

const route=Router();

route.use('/auth',authRouter);
route.get('/',proctl.homepage);

route.get('/add-project',proctl.addproject);

export default route;