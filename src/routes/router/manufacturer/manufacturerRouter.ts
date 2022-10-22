import express from "express";
import manufacturerController from "../../../controllers/manufacturer/manufacturerController";
import checkRole from "../../../middlewares/checkRoleMiddleware";

const router = express.Router();

router.post("/", checkRole("ADMIN"), manufacturerController.create);
router.get("/", manufacturerController.getAll);
router.get("/:id", manufacturerController.getOne);
router.get("/byName/:name", manufacturerController.getByName);

export default router;
