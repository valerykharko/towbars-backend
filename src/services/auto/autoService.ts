import {
  Auto,
  BodyStyle,
  Brand,
  Generation,
  Model,
} from "../../database/models/models";

export default class AutoService {
  static async getOne(brandId, modelId, generationId, bodyStyleId) {
    return await Auto.findOne({
      where: { brandId, modelId, generationId, bodyStyleId },
    });
  }

  static async getById(id) {
    const auto = await Auto.findByPk(id);
    const brand = await Brand.findByPk(auto.brandId);
    const model = await Model.findByPk(auto.modelId);
    const generation = await Generation.findByPk(auto.generationId);
    const bodyStyle = await BodyStyle.findByPk(auto.bodyStyleId);
    return {
      ...auto,
      brand: brand.name,
      model: model.name,
      generation: generation.name,
      year_of_issue: generation.year_of_issue,
      bodyStyle: bodyStyle.name,
    };
  }
}
