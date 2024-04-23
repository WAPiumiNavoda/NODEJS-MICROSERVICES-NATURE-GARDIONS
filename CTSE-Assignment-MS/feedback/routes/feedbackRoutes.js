import express from "express";
import {
  postFeedback,
  userGetAllFeedback,
  GetAllFeedback,
  userDeleteFeedback,
} from "../controllers/feedbackController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postFeedback);
router.get("/User/getall", isAuthenticated, userGetAllFeedback);
router.get("/Admin/getall", isAuthenticated, GetAllFeedback);
router.delete("/delete/:id", isAuthenticated, userDeleteFeedback);

export default router;