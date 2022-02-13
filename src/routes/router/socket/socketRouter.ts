import express from "express";
import socketController from "../../../controllers/socket/socketController";

const router = express.Router();

router.get("/rooms", socketController.getRooms);
router.get("/rooms/:id", socketController.getRoomById);
router.post("/rooms", socketController.createRoom);

export default router;
