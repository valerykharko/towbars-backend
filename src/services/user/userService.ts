import bcrypt from "bcrypt";
import { v4 } from "uuid";
import {
  Auto,
  Basket,
  BodyStyle,
  Brand,
  Generation,
  Model,
  Token,
  User,
} from "../../database/models/models";
import tokenService from "../../services/user/tokenService";
import mailService from "../../services/mail/mailService";
import ApiError from "../../errors/ApiError";
import UserDto from "../../dto/user/user-dto";

export default class UserService {
  static async registration(email, password) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = v4();

    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/auth/activate/${activationLink}`
    );
    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    const basket = await Basket.create({ userId: user.id });

    return {
      ...tokens,
      user: userDto,
    };
  }

  static async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } });
    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка активации");
    }
    await User.update({ isActivated: true }, { where: { id: user.id } });
  }

  static async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    if (user.autoId) {
      const auto = await Auto.findByPk(user.autoId);

      const brandData = await Brand.findByPk(auto.brandId);
      const modelData = await Model.findByPk(auto.modelId);
      const generationData = await Generation.findByPk(auto.generationId);
      const bodyStyleData = await BodyStyle.findByPk(auto.bodyStyleId);

      const image = auto.img;

      const userInfo = {
        ...userDto,
        user_auto: {
          brand: brandData.name,
          model: modelData.name,
          generation: generationData.name,
          body_style: bodyStyleData.name,
          img: image,
        },
      };

      return {
        ...tokens,
        user: userInfo,
      };
    }

    return {
      ...tokens,
      user: userDto,
    };
  }

  static async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  static async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        throw ApiError.NotAuthorizedError();
      }
      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);
      if (!userData || !tokenFromDb) {
        throw ApiError.NotAuthorizedError();
      }
      const user = await User.findOne({ where: { id: userData.id } });

      const userDto = new UserDto(user);

      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      if (user.autoId) {
        const auto = await Auto.findByPk(user.autoId);

        const brandData = await Brand.findByPk(auto.brandId);
        const modelData = await Model.findByPk(auto.modelId);
        const generationData = await Generation.findByPk(auto.generationId);
        const bodyStyleData = await BodyStyle.findByPk(auto.bodyStyleId);

        const image = auto.img;

        const userInfo = {
          ...userDto,
          user_auto: {
            brand: brandData.name,
            model: modelData.name,
            generation: generationData.name,
            body_style: bodyStyleData.name,
            img: image,
          },
        };
        return {
          ...tokens,
          user: userInfo,
        };
      }

      return {
        ...tokens,
        user: userDto,
      };
    } catch (e) {
      console.log(e);
    }
  }

  static async getAllUsers() {
    return await User.findAll();
  }

  static async isValidRefreshToken(id, refreshToken) {
    const data = await Token.findOne({ where: { userId: id } });
    return data.refreshToken === refreshToken;
  }

  static async isAdminToken(id, refreshToken) {
    const data = await Token.findOne({ where: { userId: id } });
    const user = await User.findByPk(id);
    return data.refreshToken === refreshToken && user.role === "ADMIN";
  }

  static async editInfo(firstName, secondName, phoneNumber, id) {
    let options = {};
    firstName && secondName && phoneNumber
      ? (options = {
          firstName,
          secondName,
          phoneNumber,
        })
      : firstName && options
      ? (options = {
          firstName,
          secondName,
        })
      : firstName
      ? (options = {
          firstName,
        })
      : secondName
      ? (options = {
          secondName,
        })
      : phoneNumber
      ? (options = {
          phoneNumber,
        })
      : "";

    await User.update(options, { where: { id: id } });

    const user = await User.findByPk(id);

    const auto = await Auto.findByPk(user.autoId);

    const brandData = await Brand.findByPk(auto.brandId);
    const modelData = await Model.findByPk(auto.modelId);
    const generationData = await Generation.findByPk(auto.generationId);
    const bodyStyleData = await BodyStyle.findByPk(auto.bodyStyleId);

    const image = auto.img;

    return {
      ...user,
      user_auto: {
        brand: brandData.name,
        model: modelData.name,
        generation: generationData.name,
        body_style: bodyStyleData.name,
        img: image,
      },
    };
  }

  static async setAuto(brand, model, generation, body_style, id) {
    const brandData = await Brand.findOne({
      where: { name: brand },
    });

    const modelData = await Model.findOne({
      where: { name: model },
    });

    const generationData = await Generation.findOne({
      where: { name: generation },
    });

    const body_styleData = await BodyStyle.findOne({
      where: { name: body_style },
    });

    const auto = await Auto.findOne({
      where: {
        brandId: brandData.id,
        modelId: modelData.id,
        generationId: generationData.id,
        bodyStyleId: body_styleData.id,
      },
    });

    await User.update({ autoId: Number(auto.id) }, { where: { id: id } });

    const user = await User.findByPk(id);

    const image = auto.img;

    return {
      ...user,
      user_auto: {
        brand,
        model,
        generation,
        body_style,
        img: image,
      },
    };
  }

  static async removeAuto(id) {
    await User.update({ autoId: null }, { where: { id: id } });

    return await User.findByPk(id);
  }
}
