import { Auto, BodyStyle } from "../../database/models/models";

export default class BodyStyleService {
  static async getAllBodyStyles(brandId, modelId, generationId) {
    if (brandId && modelId && generationId) {
      const data = await Auto.findAll({
        where: { brandId, modelId, generationId },
      });
      return await Promise.all(
        data.map(async (elem) => {
          return await BodyStyle.findOne({ where: { id: elem.bodyStyleId } });
        })
      );
    } else {
      return await BodyStyle.findAll();
    }
  }
}
