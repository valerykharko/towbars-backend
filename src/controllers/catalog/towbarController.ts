import path from "path";
import { Towbar } from "../../database/models/models";
import TowbarService from "../../services/catalog/towbarService";
import ApiError from "../../errors/ApiError";

export default class TowbarController {
  static async create(req, res, next) {
    try {
      const {
        brandF,
        country,
        vendor_code,
        max_hor,
        max_ver,
        cutout,
        ball_type,
        price,
        rating,
        farkopInfoId,
        brandId,
        modelId,
        generationId,
        bodyStyleId,
      } = req.body;

      const { img } = req.files;
      const imgName = `towbar-${vendor_code}` + ".jpg";
      img.mv(path.resolve(__dirname, "..", "database/static/images", imgName));

      const { doc } = req.files;
      const docName = `towbar-${vendor_code}` + ".pdf";
      doc.mv(
        path.resolve(__dirname, "..", "database/static/documents", docName)
      );

      const towbar = await Towbar.create({
        brandF,
        country,
        vendor_code,
        max_hor,
        max_ver,
        cutout,
        ball_type,
        price,
        rating,
        farkopInfoId,
        brandId,
        modelId,
        generationId,
        bodyStyleId,
        img: imgName,
        doc: docName,
      });

      return res.json(towbar);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const { carId } = req.body;
      const towbars = await TowbarService.findAll(carId);
      return res.json(towbars);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const towbar = await TowbarService.findOne(id);
      return res.json(towbar);
    } catch (e) {
      next(e);
    }
  }

  static async patchOne(req, res, next) {
    try {
      const { id } = req.params;
      const { payload } = req.body;
      const towbar = await TowbarService.editTowbar(id, payload);
      return res.json(towbar);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async patchAllPrice(req, res, next) {
    try {
      const { payload } = req.body;
      const towbars = await TowbarService.editAllTowbarsPrice(payload);
      return res.json(towbars);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getByCode(req, res, next) {
    try {
      const { vendor_code } = req.query;
      const towbars = await TowbarService.findAllByCode(vendor_code);
      return res.json(towbars);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
}
