import express from "express";
import {
  userRouter,
  towbarRouter,
  manufacturerRouter,
  autoRouter,
  brandRouter,
  modelRouter,
  generationRouter,
  bodyStyleRouter,
  orderRouter,
  mailRouter,
  statisticsRouter,
  loggerRouter,
} from "./router";

const router = express.Router();

router.use("/auth", userRouter);
router.use("/towbars", towbarRouter);
router.use("/manufacturers", manufacturerRouter);
router.use("/autos/brands", brandRouter);
router.use("/autos/models", modelRouter);
router.use("/autos/generations", generationRouter);
router.use("/autos/body-styles", bodyStyleRouter);
router.use("/autos", autoRouter);
router.use("/orders", orderRouter);
router.use("/mails", mailRouter);
router.use("/statistics", statisticsRouter);
router.use("/logs", loggerRouter);

export default router;
