import jwt from "jsonwebtoken";
import orderService from "../../services/order/orderService";
import ApiError from "../../errors/ApiError";

export default class OrderController {
  static async create(req, res, next) {
    try {
      const {
        items,
        totalPrice,
        totalCount,
        firstName,
        secondName,
        phoneNumber,
      } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const order = await orderService.createOne(
        items,
        totalPrice,
        totalCount,
        firstName,
        secondName,
        phoneNumber,
        id
      );
      return res.json(order);
    } catch (e) {
      console.log(e);
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const orders = await orderService.getAllOrders();
      return res.json(orders);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async getOne(req, res) {
    const { id } = req.params;
    const order = await orderService.findOne(id);
    return res.json(order);
  }

  static async getAllByUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const orders = await orderService.getAllByUserId(id);
      return res.json(orders);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}
