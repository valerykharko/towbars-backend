import express from "express";
import mailSenderController from "./mailSenderController";

const router = express.Router();

router.post("/", mailSenderController.create);
router.get("/", mailSenderController.open);

module.exports = router;
