import { Brand } from "../../database/models/models";
import brandService from "../../services/auto/brandService";
import ApiError from "../../errors/ApiError";

export default class BrandController {
  static async create(req, res, next) {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const brands = await brandService.getAllBrands();
      return res.json(brands);
    } catch (e) {
      next(e);
    }
  }

  static async getOne(req, res) {
    const { id } = req.params;
    const brand = await Brand.findOne({
      where: { id },
    });
    return res.json(brand);
  }
}
