import { Logs, User } from "../../database/models/models";

export default class LoggerService {
  static async getLogs() {
    return await Logs.findAll();
  }

  static async createLog(type, payload, location, id) {
    const user = id && (await User.findByPk(id));

    const value = {
      ...(payload?.auto && { auto: payload.auto }),
      ...(payload?.towbar && { towbar: payload.towbar }),
      ...(payload?.cart && { cart: payload.cart }),
    };

    const options = {
      ...(type && { type: type }),
      ...(value && { value: value }),
      ...(user && { user: user }),
      ...(location && { location: location }),
    };

    return await Logs.create(options);
  }
}
