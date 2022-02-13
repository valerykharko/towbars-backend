import express from "express";
import orderController from "../../../controllers/order/orderController";

const router = express.Router();

router.post("/", orderController.create);
router.get("/all", orderController.getAll);
router.get("/byUser", orderController.getAllByUser);
router.get("/:id", orderController.getOne);

export default router;
