import express from "express";
import modelController from "../../../controllers/auto/modelController";
import checkRole from "../../../middlewares/checkRoleMiddleware";

const router = express.Router();

router.post("/", checkRole("ADMIN"), modelController.create);
router.get("/", modelController.getAll);
router.get("/:id", modelController.getOne);

export default router;
