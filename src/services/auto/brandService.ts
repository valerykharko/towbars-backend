import sequelize from "sequelize";
import { Brand } from "../../database/models/models";

export default class BrandService {
  static async getAllBrands() {
    return await Brand.findAll({
      where: { visible: true },
      order: [sequelize.literal("id ASC")],
    });
  }

  static async getBrandById(id) {
    return await Brand.findByPk(id);
  }

  static async editBrand(id, value) {
    await Brand.update({ visible: value }, { where: { id: id } });

    return await Brand.findByPk(id);
  }
}
