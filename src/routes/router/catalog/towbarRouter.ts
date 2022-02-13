import express from "express";
import towbarController from "../../../controllers/catalog/towbarController";
import checkRole from "../../../middlewares/checkRoleMiddleware";
import authMiddleware from "../../../middlewares/authMiddleware";

const router = express.Router();

router.post("/", checkRole("ADMIN"), towbarController.create);
router.post("/all", authMiddleware, towbarController.getAll);
router.get("/get/byCode", towbarController.getByCode);
router.get("/:id", towbarController.getOne);

export default router;
