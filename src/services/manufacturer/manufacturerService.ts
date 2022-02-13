import { Manufacturer } from "../../database/models/models";

export default class ManufacturerService {
  static async getAll() {
    return await Manufacturer.findAll();
  }

  static async getOneById(id) {
    return await Manufacturer.findByPk(id);
  }
}
