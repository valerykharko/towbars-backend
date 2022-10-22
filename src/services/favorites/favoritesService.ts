import { Towbar, UsersFavorites } from "../../database/models/models";

export default class FavoritesService {
  static async getAllFavorites() {
    const result = await UsersFavorites.findAll();
    return Promise.all(
      result.map(async (elem: any) => {
        const towbar = await Towbar.findByPk(elem.towbarId);
        return {
          ...elem,
          towbar: towbar,
        };
      })
    );
  }

  static async createOne(id, towbarId) {
    return await UsersFavorites.create({ userId: id, towbarId });
  }

  static async deleteOne(id, towbarId) {
    return await UsersFavorites.destroy({ where: { userId: id, towbarId } });
  }
}
