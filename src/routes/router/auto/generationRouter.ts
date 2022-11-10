import express from "express";
import generationController from "../../../controllers/auto/generationController";
import checkRole from "../../../middlewares/checkRoleMiddleware";

const router = express.Router();

router.post("/", checkRole("ADMIN"), generationController.create);
router.get("/:id", checkRole("ADMIN"), generationController.getOne);
router.patch("/:id", checkRole("ADMIN"), generationController.patchOne);
router.get("/", generationController.getAll);

export default router;
