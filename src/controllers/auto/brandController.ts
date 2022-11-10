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
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const brand = await brandService.getBrandById(id);
      return res.json(brand);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async patchOne(req, res, next) {
    try {
      const { id } = req.params;
      const { value } = req.body;
      const brand = await brandService.editBrand(id, value);
      return res.json(brand);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
}
