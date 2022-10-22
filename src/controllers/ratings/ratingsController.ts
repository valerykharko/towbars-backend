import jwt from "jsonwebtoken";
import FavoritesService from "../../services/favorites/favoritesService";
import ApiError from "../../errors/ApiError";
import RatingsService from "../../services/ratings/ratingsService";
import path from "path";

export default class RatingsController {
  static async getAllTowbarRatings(req, res, next) {
    try {
      const { towbarId, page = 1, limit = 3 } = req.body;
      const offset = page * limit - limit;
      const ratings = await RatingsService.fetchAllTowbarRatings(
        towbarId,
        limit,
        offset
      );
      return res.json(ratings);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getIsUserRatings(req, res, next) {
    try {
      const { towbarId } = req.query;
      const token = req.headers.authorization.split(" ")[1];
      const { id: userId } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      const data = await RatingsService.fetchIsUserRating(userId, towbarId);
      return res.json(data);
    } catch (e) {
      console.log(e);
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getAllUserRatings(req, res, next) {
    try {
      const { page = 1, limit = 3 } = req.body;
      const offset = page * limit - limit;

      const token = req.headers.authorization.split(" ")[1];
      const { id: userId } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      const ratings = await RatingsService.fetchAllUserRatings(
        userId,
        limit,
        offset
      );
      return res.json(ratings);
    } catch (e) {
      console.log(e);
      next(ApiError.BadRequest(e.message));
    }
  }

  static async makeRating(req, res, next) {
    try {
      const { towbarId, title, text, value } = req.body;

      const { img } = req.files;
      const imgName =
        `towbar-rating${Math.random().toString(36).slice(2, 10)}` + ".jpg";
      img.mv(
        path.resolve(__dirname, "../../", "database/static/images", imgName)
      );

      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      const ratingData = await RatingsService.createOne(
        id,
        towbarId,
        title,
        text,
        value,
        imgName
      );
      return res.json(ratingData);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async editRating(req, res, next) {
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

  static async removeRating(req, res, next) {
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
