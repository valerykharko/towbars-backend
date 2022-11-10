import { Model } from "../../database/models/models";
import modelService from "../../services/auto/modelService";
import ApiError from "../../errors/ApiError";
import brandService from "../../services/auto/brandService";

export default class ModelController {
  static async create(req, res, next) {
    try {
      const { name, brandId } = req.body;
      const model = await Model.create({ name, brandId });
      return res.json(model);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const { brandId } = req.query;
      const models = await modelService.getAllModels(Number(brandId));
      return res.json(models);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const model = await modelService.getModelById(id);
      return res.json(model);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async patchOne(req, res, next) {
    try {
      const { id } = req.params;
      const { value } = req.body;
      const model = await modelService.editModel(id, value);
      return res.json(model);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
}
