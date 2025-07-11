import express from "express";
import {
  getAllJob,
  getAdminJobs,
  postJob,
  getJobById
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJob);
router.route("/get/:id").get(isAuthenticated, getJobById); // ✅ FIXED from POST to GET
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

export default router;
