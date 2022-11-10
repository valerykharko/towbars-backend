import {Order, User} from "../../database/models/models";
import mailService from "../mail/mailService";

export default class OrderService {
  static async createOne(items, userData, totalPrice, totalCount, id) {
    const result = [];
    for (const key in items) {
      result.push(items[key]);
    }

    const order = await Order.create({
      items: result,
      totalPrice,
      totalCount,
      userData,
      userId: id,
    });

    const user = await User.findByPk(order.userId)

    await mailService.sendOrderRequest(order, user);

    return order;
  }

  static async getAllOrders() {
    return await Order.findAll();
  }

  static async findOne(id) {
    return await Order.findByPk(id);
  }

  static async getAllByUserId(userId) {
    return await Order.findAll({ where: { userId } });
  }
}
