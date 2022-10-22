import { Order } from "../../database/models/models";

export default class OrderService {
  static async createOne(
    items,
    totalPrice,
    totalCount,
    firstName,
    secondName,
    phoneNumber,
    id
  ) {
    const result = [];
    for (const key in items) {
      result.push(items[key]);
    }
    return await Order.create({
      items: result,
      status: "Новый заказ",
      totalPrice,
      totalCount,
      firstName,
      secondName,
      phoneNumber,
      userId: id,
    });
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
