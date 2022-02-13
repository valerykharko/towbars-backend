import { Model } from "../../database/models/models";

export default class ModelService {
  static async getAllModels(brandId) {
    return brandId
      ? await Model.findAll({ where: { brandId } })
      : await Model.findAll();
  }
}
