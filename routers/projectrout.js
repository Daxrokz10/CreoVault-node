import { Router } from "express";
import proctl from "../controllers/proctl.js";

const route=Router();

route.get('/',proctl.homepage);
route.get('/creo-login',proctl.loginpage);
route.get('/add-project',proctl.addproject);

export default route;