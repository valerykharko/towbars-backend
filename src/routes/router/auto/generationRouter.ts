import express from "express";
import generationController from "../../../controllers/auto/generationController";
import checkRole from "../../../middlewares/checkRoleMiddleware";

const router = express.Router();

router.post("/", checkRole("ADMIN"), generationController.create);
router.get("/", generationController.getAll);
router.get("/:id", generationController.getOne);

export default router;
