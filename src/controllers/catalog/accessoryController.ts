import path from "path";
import { Accessory } from "../../database/models/models";
import ApiError from "../../errors/ApiError";

export default class AccessoryController {
  static async create(req, res, next) {
    try {
      let {
        name,
        brand,
        country,
        vendor_code,
        price,
        rating,
        accessoriesInfoId,
        typeAccessoryId,
      } = req.body;

      const { img } = req.files;
      let imgName = `accessory${brand}${vendor_code}` + ".jpg";
      img.mv(path.resolve(__dirname, "..", "database/static/images", imgName));

      const { doc } = req.files;
      let docName = `accessory${brand}${vendor_code}` + ".pdf";
      doc.mv(
        path.resolve(__dirname, "..", "database/static/documents", docName)
      );

      const accessory = await Accessory.create({
        name,
        brand,
        country,
        vendor_code,
        price,
        rating,
        accessoriesInfoId,
        typeAccessoryId,
        img: imgName,
        doc: docName,
      });
      return res.json(accessory);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getAll(req, res) {
    let { typeAccessoryId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 3;
    let offset = page * limit - limit;
    let accessories;
    if (!typeAccessoryId) {
      accessories = await Accessory.findAndCountAll({ limit, offset });
    } else {
      accessories = await Accessory.findAndCountAll({
        where: { typeAccessoryId },
        limit,
        offset,
      });
    }
    return res.json(accessories);
  }

  static async getOne(req, res) {
    const { id } = req.params;
    const accessory = await Accessory.findOne({
      where: { id },
    });
    return res.json(accessory);
  }
}
