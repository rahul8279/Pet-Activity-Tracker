import express from "express";
import { createActivity, getReminder, getTodaySummary } from "../controller/actvityController.js";

const router = express.Router();
router.route("/create").post(createActivity);
router.route("/today").get(getTodaySummary);
router.route("/reminder").post(getReminder);

export default router;