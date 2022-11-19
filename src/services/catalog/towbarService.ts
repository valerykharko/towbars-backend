import sequelize, { Op } from "sequelize";
import {
  Auto,
  BodyStyle,
  Brand,
  Generation,
  Manufacturer,
  Model,
  Towbar,
} from "../../database/models/models";

export default class TowbarService {
  static async findAll(autoId) {
    const towbars = await Towbar.findAll({
      where: { autoId, visible: true },
      order: [sequelize.literal("price DESC")],
    });

    return await Promise.all(
      towbars.map(async (elem) => {
        const autoData = await Auto.findByPk(elem.autoId);
        const brandData = await Brand.findByPk(autoData.brandId);
        const modelData = await Model.findByPk(autoData.modelId);
        const generationData = await Generation.findByPk(autoData.generationId);
        const bodyStyleData = await BodyStyle.findByPk(autoData.bodyStyleId);

        const manufacturerData = await Manufacturer.findByPk(
          elem.manufacturerId
        );

        return {
          ...elem,
          manufacturer: manufacturerData,
          auto: {
            brand: brandData,
            model: modelData,
            generation: generationData,
            bodyStyle: bodyStyleData,
          },
        };
      })
    );
  }

  static async findOne(towbarId) {
    const towbar = await Towbar.findOne({
      where: { id: towbarId },
    });
    const autoData = await Auto.findByPk(towbar.autoId);
    const brandData = await Brand.findByPk(autoData.brandId);
    const modelData = await Model.findByPk(autoData.modelId);
    const generationData = await Generation.findByPk(autoData.generationId);
    const bodyStyleData = await BodyStyle.findByPk(autoData.bodyStyleId);

    const manufacturerData = await Manufacturer.findByPk(towbar.manufacturerId);

    return {
      ...towbar,
      manufacturer: manufacturerData,
      auto: {
        brand: brandData,
        model: modelData,
        generation: generationData,
        bodyStyle: bodyStyleData,
      },
    };
  }

  static async findAllByCode(vendor_code) {
    return await Towbar.findAll({
      where: {
        vendor_code: {
          [Op.substring]: vendor_code,
        },
      },
    });
  }

  static async editTowbar(id, payload) {
    const options = {
      ...(payload.visible && { visible: payload.visible }),
      ...(payload.price && { price: payload.price }),
    };
    await Towbar.update(options, { where: { id: id } });

    return await Towbar.findByPk(id);
  }

  static async editAllTowbarsPrice(payload) {
    const count = Number(payload);

    await Towbar.update(
      {
        price: sequelize.fn("ROUND", sequelize.literal(`price * ${count}`), -2),
      },
      {
        where: {
          id: {
            [Op.gt]: 0,
          },
        },
      }
    );

    return await Towbar.findAll({
      where: { visible: true },
      order: [sequelize.literal("price DESC")],
      limit: 10,
    });
  }
}
