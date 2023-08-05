import express from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/all-users", getAllUsers);

router.post("/user-register", registerUser);

router.post("/user-login", loginUser);

export default router;