import { rooms } from "../../../server";
import ApiError from "../../errors/ApiError";
import manufacturerService from "../../services/manufacturer/manufacturerService";

export default class SocketController {
  static async createRoom(req, res, next) {
    try {
      const { roomId, userName } = req.body;
      if (!rooms.has(roomId)) {
        rooms.set(
          roomId,
          new Map<any, any>([
            ["users", new Map()],
            ["messages", []],
          ])
        );
      }
      return res.json();
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  static async getRooms(req, res, next) {
    try {
      return res.json(rooms);
    } catch (e) {
      next(e);
    }
  }

  static async getRoomById(req, res, next) {
    try {
      const { id: roomId } = req.params;
      const obj = rooms.has(roomId)
        ? {
            users: [...rooms.get(roomId).get("users").values()],
            messages: [...rooms.get(roomId).get("messages").values()],
          }
        : { users: [], messages: [] };
      return res.json(obj);
    } catch (e) {
      next(e);
    }
  }

  // static async getOne(req, res) {
  //   const { id } = req.params;
  //   const brand = await Manufacturer.findOne({
  //     where: { id },
  //   });
  //   return res.json(brand);
  // }
}
