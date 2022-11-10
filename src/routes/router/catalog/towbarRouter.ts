import express from "express";
import towbarController from "../../../controllers/catalog/towbarController";
import checkRole from "../../../middlewares/checkRoleMiddleware";

const router = express.Router();

router.post("/", checkRole("ADMIN"), towbarController.create);
router.patch("/:id", checkRole("ADMIN"), towbarController.patchOne);
router.patch("/", checkRole("ADMIN"), towbarController.patchAllPrice);
router.post("/all", towbarController.getAll);
router.get("/get/byCode", towbarController.getByCode);
router.get("/:id", towbarController.getOne);

export default router;
