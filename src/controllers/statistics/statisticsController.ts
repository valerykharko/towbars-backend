import ApiError from "../../errors/ApiError";
import StatisticsService from "../../services/statistics/statisticsService";

export default class StatisticsController {
  static async getOrdersByDate(req, res, next) {
    try {
      const { dateRange } = req.body;
      const statistics = await StatisticsService.getReport(dateRange);

      return res.json(statistics);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
}
