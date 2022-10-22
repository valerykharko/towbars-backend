import express from "express";
import checkRole from "../../../middlewares/checkRoleMiddleware";
import socketController from "../../../controllers/socket/socketController";

const router = express.Router();

router.get("/rooms", checkRole("ADMIN"), socketController.getRooms);
router.get("/rooms/:id", checkRole("ADMIN"), socketController.getRoomById);
router.post("/rooms", checkRole("ADMIN"), socketController.createRoom);

export default router;
