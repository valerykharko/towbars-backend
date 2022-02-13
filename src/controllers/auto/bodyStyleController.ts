import { BodyStyle } from "../../database/models/models";
import ApiError from "../../errors/ApiError";
import bodyStyleService from "../../services/auto/bodyStyleService";

export default class BodyStyleController {
  static async create(req, res, next) {
    try {
      const { name, generationId } = req.body;
      const body_style = await BodyStyle.create({ name, generationId });
      return res.json(body_style);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const { brandId, modelId, generationId } = req.query;
      const bodyStyles = await bodyStyleService.getAllBodyStyles(
        Number(brandId),
        Number(modelId),
        Number(generationId)
      );
      return res.json(bodyStyles);
    } catch (e) {
      next(e);
    }
  }

  static async getOne(req, res) {
    const { id } = req.params;
    const body_style = await BodyStyle.findOne({
      where: { id },
    });
    return res.json(body_style);
  }
}
