import express from "express";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import tokenService from "../../services/user/tokenService";
import userService from "../../services/user/userService";
import ApiError from "../../errors/ApiError";

export default class UserController {
  static async registration(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async logout(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async activate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async refresh(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getUsers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async isValidToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res.json(false);
      }
      const userData = await tokenService.validateRefreshToken(refreshToken);
      if (!userData) {
        return res.json(false);
      }
      const isValid = await userService.isValidRefreshToken(
        userData.id,
        refreshToken
      );
      return res.json(isValid);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async isAdmin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res.json(false);
      }
      const userData = await tokenService.validateRefreshToken(refreshToken);
      if (!userData) {
        return res.json(false);
      }
      const isAdmin = await userService.isAdminToken(userData.id, refreshToken);
      return res.json(isAdmin);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async editUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { firstName, secondName, patronymic, country, city, phoneNumber } =
        req.body;
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const user = await userService.editInfo(
        firstName,
        secondName,
        patronymic,
        country,
        city,
        phoneNumber,
        id
      );
      return res.json(user);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }


}
