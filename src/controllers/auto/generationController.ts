import { Generation } from "../../database/models/models";
import ApiError from "../../errors/ApiError";
import generationService from "../../services/auto/generationService";
import modelService from "../../services/auto/modelService";

export default abstract class GenerationController {
  static async create(req, res, next) {
    try {
      const { name, year_of_issue, smart, modelId } = req.body;
      const generation = await Generation.create({
        name,
        year_of_issue,
        smart,
        modelId,
      });
      return res.json(generation);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const { modelId } = req.query;
      const generations = await generationService.getAllGenerations(
        Number(modelId)
      );
      return res.json(generations);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const generation = await generationService.getGenerationById(id);
      return res.json(generation);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async patchOne(req, res, next) {
    try {
      const { id } = req.params;
      const { value } = req.body;
      const generation = await generationService.editGeneration(id, value);
      return res.json(generation);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
}
