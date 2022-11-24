import express from "express";
import loggerController from "../../../controllers/logger/loggerController";

const router = express.Router();

router.post("/", loggerController.createLog);
// router.get("/", loggerController.getAllLogs);

export default router;
