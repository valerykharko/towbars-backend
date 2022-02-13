import express from "express";
import checkRole from "../../../middlewares/checkRoleMiddleware";
import bodyStyleController from "../../../controllers/auto/bodyStyleController";

const router = express.Router();

router.post("/", checkRole("ADMIN"), bodyStyleController.create);
router.get("/", bodyStyleController.getAll);
router.get("/:id", bodyStyleController.getOne);

export default router;
