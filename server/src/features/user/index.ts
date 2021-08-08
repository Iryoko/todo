import { Router } from "express";
import * as controller from "./controller";

const user = Router();

user.post("/signup", controller.signup);
user.post("/login", controller.login);
user.get("/logout", controller.logout);
user.get("/me", controller.me);

export { user };
