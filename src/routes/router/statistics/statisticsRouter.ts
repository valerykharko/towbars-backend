import express from "express";
import StatisticsController from "../../../controllers/statistics/statisticsController";
import checkRole from "../../../middlewares/checkRoleMiddleware";

const router = express.Router();

router.post(
  "/orders",
  checkRole("ADMIN"),
  StatisticsController.getOrdersByDate
);

export default router;
