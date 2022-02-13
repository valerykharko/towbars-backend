const path = require("path");
import { WiringKit } from "../../database/models/models";
import ApiError from "../../errors/ApiError";

export default class WiringKitController {
  static async create(req, res, next) {
    try {
      const {
        brandWK,
        country,
        vendor_code,
        pin,
        price,
        rating,
        brandId,
        modelId,
        generationId,
        bodyStyleId,
        wiringKitInfoId,
      } = req.body;

      const { img } = req.files;
      let imgName = `wiringkit${brandWK}${vendor_code}` + ".jpg";
      img.mv(path.resolve(__dirname, "..", "database/static/images", imgName));

      const { doc } = req.files;
      let docName = `wiringkit${brandWK}${vendor_code}` + ".pdf";
      doc.mv(
        path.resolve(__dirname, "..", "database/static/documents", docName)
      );

      const wiring_kit = await WiringKit.create({
        brandWK,
        country,
        vendor_code,
        pin,
        price,
        rating,
        brandId,
        modelId,
        generationId,
        bodyStyleId,
        wiringKitInfoId,
        img: imgName,
        doc: docName,
      });

      return res.json(wiring_kit);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getAll(req, res) {
    let { brandId, modelId, generationId, bodyStyleId, limit, page } =
      req.query;
    page = page || 1;
    limit = limit || 5;
    let offset = page * limit - limit;
    let wiring_kits;
    if (!brandId && !modelId && !generationId && !bodyStyleId) {
      wiring_kits = await WiringKit.findAndCountAll({ limit, offset });
    }
    if (brandId && !modelId && !generationId && !bodyStyleId) {
      wiring_kits = await WiringKit.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (brandId && modelId && !generationId && !bodyStyleId) {
      wiring_kits = await WiringKit.findAndCountAll({
        where: { brandId, modelId },
        limit,
        offset,
      });
    }
    if (brandId && modelId && generationId && !bodyStyleId) {
      wiring_kits = await WiringKit.findAndCountAll({
        where: { brandId, modelId, generationId },
        limit,
        offset,
      });
    }
    if (brandId && modelId && generationId && bodyStyleId) {
      wiring_kits = await WiringKit.findAndCountAll({
        where: { brandId, modelId, generationId, bodyStyleId },
        limit,
        offset,
      });
    }
    return res.json(wiring_kits);
  }

  static async getOne(req, res) {
    const { id } = req.params;
    const wiring_kit = await WiringKit.findOne({
      where: { id },
    });
    return res.json(wiring_kit);
  }
}
