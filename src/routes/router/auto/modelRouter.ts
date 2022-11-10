import express from "express";
import modelController from "../../../controllers/auto/modelController";
import checkRole from "../../../middlewares/checkRoleMiddleware";

const router = express.Router();

router.post("/", checkRole("ADMIN"), modelController.create);
router.get("/:id", checkRole("ADMIN"), modelController.getOne);
router.patch("/:id", checkRole("ADMIN"), modelController.patchOne);
router.get("/", modelController.getAll);

export default router;
