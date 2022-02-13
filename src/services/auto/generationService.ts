import { Generation } from "../../database/models/models";

export default class GenerationService {
  static async getAllGenerations(modelId) {
    return modelId
      ? await Generation.findAll({ where: { modelId } })
      : await Generation.findAll();
  }
}
