import express from "express";
import { body } from "express-validator";
import userController from "../../../controllers/user/userController";
import authMiddleware from "../../../middlewares/authMiddleware";

const router = express.Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 16 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/isValid", userController.isValidToken);
router.get("/isAdmin", userController.isAdmin);
router.patch("/user", authMiddleware, userController.editUser);
router.post("/logs", userController.createLog);
router.get("/logs", userController.getAllLogs);

export default router;
