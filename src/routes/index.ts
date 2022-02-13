import express from "express";
import {
  userRouter,
  towbarRouter,
  wiringKitRouter,
  accessoryRouter,
  manufacturerRouter,
  autoRouter,
  brandRouter,
  modelRouter,
  generationRouter,
  bodyStyleRouter,
  socketRouter,
  orderRouter,
} from "./router";

const router = express.Router();

router.use("/auth", userRouter);
router.use("/towbars", towbarRouter);
router.use("/wiring-kits", wiringKitRouter);
router.use("/accessories", accessoryRouter);
router.use("/manufacturers", manufacturerRouter);
router.use("/autos/brands", brandRouter);
router.use("/autos/models", modelRouter);
router.use("/autos/generations", generationRouter);
router.use("/autos/body-styles", bodyStyleRouter);
router.use("/autos", autoRouter);
router.use("/sockets", socketRouter);
router.use("/orders", orderRouter);

export default router;
