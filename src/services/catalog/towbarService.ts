import sequelize, { Op } from "sequelize";
import {
  Auto,
  BodyStyle,
  Brand,
  Generation,
  Manufacturer,
  Model,
  Rating,
  Towbar,
} from "../../database/models/models";

export default class TowbarService {
  static async findAndCountAll(carId, limit, offset, options) {
    try {
      const cutOut = options.isBumperCutOut === true ? "Да" : "Нет";

      const sortBy =
        options.sortValue === "Сначала дорогие"
          ? "max(price) DESC"
          : options.sortValue === "Сначала дешевые"
          ? "max(price)"
          : "";

      const where1 =
        options.manufacturers.length !== 0
          ? {
              cutout: cutOut,
              autoId: carId,
              price: {
                [Op.gte]: options.price[0],
                [Op.lte]: options.price[1],
              },
              manufacturerId: {
                [Op.in]: options.manufacturers,
              },
            }
          : {
              cutout: cutOut,
              autoId: carId,
              price: {
                [Op.gte]: options.price[0],
                [Op.lte]: options.price[1],
              },
            };

      const where2 =
        options.manufacturers.length !== 0
          ? {
              cutout: cutOut,
              price: {
                [Op.gte]: options.price[0],
                [Op.lte]: options.price[1],
              },
              manufacturerId: {
                [Op.in]: options.manufacturers,
              },
            }
          : {
              cutout: cutOut,
              price: {
                [Op.gte]: options.price[0],
                [Op.lte]: options.price[1],
              },
            };

      const towbars = sortBy
        ? carId
          ? await Towbar.findAndCountAll({
              where: where1,
              order: sequelize.literal(sortBy),
              group: ["id"],
            })
          : await Towbar.findAndCountAll({
              where: where2,
              limit,
              offset,
              order: sequelize.literal(sortBy),
              group: ["id"],
            })
        : carId
        ? await Towbar.findAndCountAll({
            where: where1,
          })
        : await Towbar.findAndCountAll({
            where: where2,
            limit,
            offset,
          });

      const data = await Promise.all(
        towbars.rows.map(async (elem) => {
          const ratingData = await Rating.findOne({
            where: { towbarId: elem.id },
          });

          const autoData = await Auto.findByPk(elem.autoId);
          const brandData = await Brand.findByPk(autoData.brandId);
          const modelData = await Model.findByPk(autoData.modelId);
          const generationData = await Generation.findByPk(
            autoData.generationId
          );
          const bodyStyleData = await BodyStyle.findByPk(autoData.bodyStyleId);

          const manufacturerData = await Manufacturer.findByPk(
            elem.manufacturerId
          );

          return {
            ...elem,
            ratingValue: ratingData.rating,
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

      return {
        rows: sortBy
          ? data
          : data.sort(function (a: any, b: any) {
              return parseFloat(b.ratingValue) - parseFloat(a.ratingValue);
            }),
        count: sortBy ? towbars.count.length : towbars.count,
      };
    } catch (e) {
      console.log(e);
    }
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
}
