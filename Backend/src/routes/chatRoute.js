import express from "express";
import { handleChat } from "../controller/chatController.js";

const router = express.Router();
router.route("/conversation").post(handleChat);

export default router;
