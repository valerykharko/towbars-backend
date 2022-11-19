import { Order, Towbar, User } from "../../database/models/models";
import mailService from "../mail/mailService";
import sequelize, { Op, or } from "sequelize";

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

    const user = await User.findByPk(order.userId);

    await mailService.sendOrderRequest(order, user);

    return order;
  }

  static async getAllOrders() {
    return await Order.findAll();
  }

  static async findOne(id) {
    const order = await Order.findByPk(id);

    const userData = await User.findByPk(order.userId);

    return {
      ...order,
      user: {
        firstName: userData.firstName,
        secondName: userData.secondName,
        patronymic: userData.patronymic,
        country: userData.country,
        city: userData.city,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
      },
    };
  }

  static async getAllByUserId(userId) {
    return await Order.findAll({ where: { userId } });
  }

  static async editOrder(id, payload) {
    const result = [];
    for (const key in payload.items) {
      result.push(payload.items[key]);
    }

    const options = {
      ...(payload.status && { status: payload.status }),
      ...(payload.shipment_date && { shipment_date: payload.shipment_date }),
      ...(payload.items && { items: result }),
      ...(payload.totalCount && { totalCount: payload.totalCount }),
      ...(payload.totalPrice && { totalPrice: payload.totalPrice }),
    };

    await Order.update(options, { where: { id: id } });

    const order = await Order.findByPk(id);

    const userData = await User.findByPk(order.userId);

    return {
      ...order,
      user: {
        firstName: userData.firstName,
        secondName: userData.secondName,
        patronymic: userData.patronymic,
        country: userData.country,
        city: userData.city,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
      },
    };
  }
}
