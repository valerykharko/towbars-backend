import jwt from "jsonwebtoken";
import orderService from "../../services/order/orderService";
import ApiError from "../../errors/ApiError";
import TowbarService from "../../services/catalog/towbarService";

export default class OrderController {
  static async create(req, res, next) {
    try {
      const { items, userData, totalPrice, totalCount } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const order = await orderService.createOne(
        items,
        userData,
        totalPrice,
        totalCount,
        id
      );
      return res.json(order);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const orders = await orderService.getAllOrders();
      return res.json(orders);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const order = await orderService.findOne(id);
      return res.json(order);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async editOne(req, res, next) {
    try {
      const { id } = req.params;
      const { payload } = req.body;
      const order = await orderService.editOrder(id, payload);
      return res.json(order);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getAllByUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const orders = await orderService.getAllByUserId(id);
      return res.json(orders);
    } catch (e) {
      next(e);
    }
  }
}
