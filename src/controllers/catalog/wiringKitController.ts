import TowbarService from "../../services/catalog/towbarService";

const path = require("path");
import { WiringKit } from "../../database/models/models";
import ApiError from "../../errors/ApiError";
import WiringKitService from "../../services/catalog/wiringKitService";

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

  static async getAll(req, res, next) {
    try {
      const { carId, page = 1, limit = 8, options } = req.body;
      const offset = page * limit - limit;
      const wiringKits = await WiringKitService.findAndCountAll(
        carId,
        limit,
        offset,
        options
      );
      return res.json(wiringKits);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async getOne(req, res) {
    const { id } = req.params;
    const wiring_kit = await WiringKit.findOne({
      where: { id },
    });
    return res.json(wiring_kit);
  }
}
