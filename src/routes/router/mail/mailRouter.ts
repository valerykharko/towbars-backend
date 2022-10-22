import express from "express";
import mailController from "../../../controllers/mail/mailController";

const router = express.Router();

router.get("/request-call", mailController.getMailAboutRequestCall);

export default router;
