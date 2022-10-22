import jwt from "jsonwebtoken";
import FavoritesService from "../../services/favorites/favoritesService";
import ApiError from "../../errors/ApiError";

export default class FavoritesController {
  static async getAll(req, res, next) {
    try {
      const favorites = await FavoritesService.getAllFavorites();
      return res.json(favorites);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async addFavorite(req, res, next) {
    try {
      const { towbarId } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      await FavoritesService.createOne(id, towbarId);
      const favorites = await FavoritesService.getAllFavorites();
      return res.json(favorites);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async removeFavorite(req, res, next) {
    try {
      const { towbarId } = req.query;
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      await FavoritesService.deleteOne(id, towbarId);
      const favorites = await FavoritesService.getAllFavorites();
      return res.json(favorites);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
}
