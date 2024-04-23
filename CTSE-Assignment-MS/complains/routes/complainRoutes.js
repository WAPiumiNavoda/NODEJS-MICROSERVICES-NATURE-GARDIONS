import express from "express";
import {
  deleteComplains,
  getAllComplains,
  getMyComplains,
  getSingleComplain,
  postComplains,
  updateComplains,

} from "../controllers/complainsController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllComplains);
router.post("/post", isAuthenticated, postComplains);
router.get("/getmycomplains", isAuthenticated, getMyComplains);
router.put("/update/:id", isAuthenticated, updateComplains);
router.delete("/delete/:id", isAuthenticated, deleteComplains);
router.get("/:id", isAuthenticated, getSingleComplain);

export default router;
