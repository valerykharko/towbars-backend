import express from "express";
import checkRole from "../../../middlewares/checkRoleMiddleware";
import brandController from "../../../controllers/auto/brandController";

const router = express.Router();

router.post("/", checkRole("ADMIN"), brandController.create);
router.get("/:id", checkRole("ADMIN"), brandController.getOne);
router.patch("/:id", checkRole("ADMIN"), brandController.patchOne);
router.get("/", brandController.getAll);

export default router;
