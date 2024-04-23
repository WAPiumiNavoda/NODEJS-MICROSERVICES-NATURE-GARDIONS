import express from "express";
import {
  getAllArticles,
  postArticle,
  updateArticle,
  deleteArticle,
  getSingleArticle
} from "../controllers/articleController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllArticles);
router.post("/post", isAuthenticated, postArticle);
router.put("/update/:id", isAuthenticated, updateArticle);
router.delete("/delete/:id", isAuthenticated, deleteArticle);
router.get("/:id", isAuthenticated, getSingleArticle);

export default router;
