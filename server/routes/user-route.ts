import { register, login } from "../controllers/user-controller";
import express from "express";

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);

export default userRoutes;