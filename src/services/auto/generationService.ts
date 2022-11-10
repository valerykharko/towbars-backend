import sequelize from "sequelize";
import { Generation } from "../../database/models/models";

export default class GenerationService {
  static async getAllGenerations(modelId) {
    return modelId
      ? await Generation.findAll({
          where: { modelId, visible: true },
          order: [sequelize.literal("id ASC")],
        })
      : await Generation.findAll({ order: [sequelize.literal("id ASC")] });
  }

  static async getGenerationById(id) {
    return await Generation.findByPk(id);
  }

  static async editGeneration(id, value) {
    await Generation.update({ visible: value }, { where: { id: id } });

    return await Generation.findByPk(id);
  }
}
