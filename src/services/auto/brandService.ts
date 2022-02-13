import { Brand } from "../../database/models/models";

export default class BrandService {
  static async getAllBrands() {
    return await Brand.findAll();
  }
}
