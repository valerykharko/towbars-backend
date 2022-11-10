import sequelize from "sequelize";
import { Model } from "../../database/models/models";

export default class ModelService {
  static async getAllModels(brandId) {
    return brandId
      ? await Model.findAll({
          where: { brandId, visible: true },
          order: [sequelize.literal("id ASC")],
        })
      : await Model.findAll({ order: [sequelize.literal("id ASC")] });
  }

  static async getModelById(id) {
    return await Model.findByPk(id);
  }

  static async editModel(id, value) {
    await Model.update({ visible: value }, { where: { id: id } });

    return await Model.findByPk(id);
  }
}
