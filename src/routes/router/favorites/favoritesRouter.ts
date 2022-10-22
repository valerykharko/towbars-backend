import express from "express";
import favoritesController from "../../../controllers/favorites/favoritesController";

const router = express.Router();

router.get("/", favoritesController.getAll);
router.post("/add", favoritesController.addFavorite);
router.delete("/remove", favoritesController.removeFavorite);

export default router;
