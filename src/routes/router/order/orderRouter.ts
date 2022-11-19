import express from "express";
import orderController from "../../../controllers/order/orderController";
import checkRole from "../../../middlewares/checkRoleMiddleware";
import authMiddleware from "../../../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, orderController.create);
router.get("/all", checkRole("ADMIN"), orderController.getAll);
router.get("/byUser", authMiddleware, orderController.getAllByUser);
router.get("/:id", checkRole("ADMIN"), orderController.getOne);
router.patch("/:id", checkRole("ADMIN"), orderController.editOne);

export default router;
