import {
  Manufacturer,
  Rating,
  Towbar,
  User,
  UsersFavorites,
  UsersRatings,
} from "../../database/models/models";

export default class RatingsService {
  static async fetchAllTowbarRatings(towbarId, limit, offset) {
    const ratingData = await Rating.findOne({ where: { towbarId } });
    const ratings = await UsersRatings.findAndCountAll({
      where: { ratingId: ratingData.id },
      limit,
      offset,
    });
    const data = await Promise.all(
      ratings.rows.map(async (elem: any) => {
        const user = await User.findByPk(elem.userId);
        return {
          ...elem,
          user,
        };
      })
    );

    return {
      rows: data,
      rating: ratingData.rating,
      count: ratings.count,
    };
  }

  static async fetchIsUserRating(userId, towbarId) {
    const userRatings = await UsersRatings.findAll({
      where: { userId: Number(userId) },
    });

    const rating = await Rating.findOne({
      where: { towbarId: towbarId },
    });

    const isUserRating = userRatings.some(
      (elem) =>
        // @ts-ignore
        elem.ratingId === rating.id
    );

    return {
      isUserRating,
      ratingId: rating.id,
    };
  }

  static async fetchAllUserRatings(userId, limit, offset) {
    const ratings = await UsersRatings.findAndCountAll({
      where: { userId: userId },
      limit,
      offset,
    });

    const data = await Promise.all(
      ratings.rows.map(async (elem: any) => {
        const rating = await Rating.findByPk(elem.ratingId);
        const towbar = await Towbar.findByPk(rating.towbarId);
        const manufacturer = await Manufacturer.findByPk(towbar.manufacturerId);

        return {
          ...elem,
          towbar: towbar,
          manufacturer: manufacturer,
        };
      })
    );

    return {
      rows: data,
      count: ratings.count,
    };
  }

  static async createOne(id, towbarId, title, text, value, imgName) {
    const rating = await Rating.findOne({ where: { towbarId } });

    const newRating = await UsersRatings.create({
      title: String(title),
      text: String(text),
      value: Number(value),
      img: [imgName],
      userId: Number(id),
      ratingId: Number(rating.id),
    });

    const ratings = await UsersRatings.findAndCountAll({
      where: { ratingId: rating.id },
    });

    let totalCount: number = 0;

    // @ts-ignore
    ratings.rows.map((elem) => (totalCount = totalCount + elem.value));

    console.log(totalCount);
    console.log(totalCount / ratings.count);

    await Rating.update(
      { rating: Number(totalCount / ratings.count) },
      { where: { towbarId } }
    );

    return newRating;
  }

  static async editOne(id, towbarId) {
    return await UsersFavorites.destroy({ where: { userId: id, towbarId } });
  }

  static async deleteOne(id, towbarId) {
    return await UsersFavorites.destroy({ where: { userId: id, towbarId } });
  }
}
