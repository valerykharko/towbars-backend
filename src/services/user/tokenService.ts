import jwt from "jsonwebtoken";
import { Token } from "../../database/models/models";

export default class TokenService {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  static validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  static validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      return null;
    }
  }

  static async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({
      where: { userId },
    });
    if (tokenData) {
      return await Token.update(
        { refreshToken: refreshToken },
        {
          where: { userId },
        }
      );
    }
    return await Token.create({ refreshToken, userId });
  }

  static async removeToken(refreshToken) {
    return await Token.destroy({ where: { refreshToken } });
  }

  static async findToken(refreshToken) {
    return await Token.findOne({ where: { refreshToken } });
  }
}
