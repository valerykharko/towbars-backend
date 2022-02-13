import express from "express";
import accessoryController from "../../../controllers/catalog/accessoryController";
import checkRole from "../../../middlewares/checkRoleMiddleware";

const router = express.Router();

router.post("/", checkRole("ADMIN"), accessoryController.create);
router.get("/", accessoryController.getAll);
router.get("/:id", accessoryController.getOne);

export default router;
