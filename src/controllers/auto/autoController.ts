import { Auto } from "../../database/models/models";
import autoService from "../../services/auto/autoService";
import ApiError from "../../errors/ApiError";

export default class AutoController {
  static async create(req, res, next) {
    try {
      const { name } = req.body;
      const auto = await Auto.create({ name });
      return res.json(auto);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const autos = await Auto.findAll();
      return res.json(autos);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getOne(req, res, next) {
    try {
      const { brandId, modelId, generationId, bodyStyleId } = req.query;
      const auto = await autoService.getOne(
        brandId,
        modelId,
        generationId,
        bodyStyleId
      );
      return res.json(auto);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const auto = await autoService.getById(id);
      return res.json(auto);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
}
