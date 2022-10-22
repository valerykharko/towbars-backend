import express from "express";
import { body } from "express-validator";
import userController from "../../../controllers/user/userController";
import authMiddleware from "../../../middlewares/authMiddleware";
import checkRole from "../../../middlewares/checkRoleMiddleware";

const router = express.Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/isValid", userController.isValidToken);
router.get("/isAdmin", userController.isAdmin);
router.patch(
  "/user/auto/remove",
  authMiddleware,
  userController.removeUserAuto
);
router.patch("/user/auto", authMiddleware, userController.updateUserAuto);
router.patch("/user", authMiddleware, userController.editUser);

export default router;
