import { Model } from "../../database/models/models";
import modelService from "../../services/auto/modelService";
import ApiError from "../../errors/ApiError";

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
      next(e);
    }
  }

  static async getOne(req, res) {
    const { id } = req.params;
    const model = await Model.findOne({
      where: { id },
    });
    return res.json(model);
  }
}
