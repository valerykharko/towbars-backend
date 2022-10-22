import express from "express";
import ratingsController from "../../../controllers/ratings/ratingsController";

const router = express.Router();

router.post("/byTowbar", ratingsController.getAllTowbarRatings);
router.post("/byUser", ratingsController.getAllUserRatings);
router.get("/byUser", ratingsController.getIsUserRatings);
router.post("/", ratingsController.makeRating);
router.patch("/", ratingsController.editRating);
router.delete("/", ratingsController.removeRating);

export default router;
