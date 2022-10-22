import express from "express";
import wiringKitController from "../../../controllers/catalog/wiringKitController";
import checkRole from "../../../middlewares/checkRoleMiddleware";

const router = express.Router();

router.post("/", checkRole("ADMIN"), wiringKitController.create);
router.post("/all", wiringKitController.getAll);
router.get("/:id", wiringKitController.getOne);

export default router;
