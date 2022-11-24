import express from "express";
import jwt from "jsonwebtoken";
import loggerService from "../../services/logger/loggerService";
import ApiError from "../../errors/ApiError";

export default class TowbarController {
  static async getAllLogs(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const logs = await loggerService.getLogs();
      return res.json(logs);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async createLog(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { type, payload, location } = req.body;

      let userId;
      if (req.headers.authorization.split(" ")[1] !== "null") {
        const token = req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        userId = id;
      }

      await loggerService.createLog(type, payload, location, userId);
      return res.json();
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
}
