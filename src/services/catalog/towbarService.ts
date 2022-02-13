import Sequelize from "sequelize";
import { Towbar } from "../../database/models/models";

const Op = Sequelize.Op;

export default class TowbarService {
  static async findAndCountAll(carId, limit, offset, options) {
    const cutOut = options.isBumperCutOut === true ? "Да" : "Нет";

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

    return carId
      ? await Towbar.findAndCountAll({
          where: where1,
        })
      : await Towbar.findAndCountAll({
          where: where2,
          limit,
          offset,
        });
  }

  static async findOne(towbarId) {
    return await Towbar.findOne({
      where: { id: towbarId },
    });
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
