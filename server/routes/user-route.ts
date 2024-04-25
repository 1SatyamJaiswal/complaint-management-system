import multer from "multer";
import { register, login, createComplaint } from "../controllers/user-controller";
import express from "express";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/complaint", upload.single("file"), createComplaint);

export default userRoutes;