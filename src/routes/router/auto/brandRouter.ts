import express from "express";
import checkRole from "../../../middlewares/checkRoleMiddleware";
import brandController from "../../../controllers/auto/brandController";
import authMiddleware from "../../../middlewares/authMiddleware";

const router = express.Router();

router.post("/", checkRole("ADMIN"), brandController.create);
router.get("/", authMiddleware, brandController.getAll);
router.get("/:id", brandController.getOne);

export default router;
