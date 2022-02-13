import ApiError from "../errors/ApiError";
import tokenService from "../services/user/tokenService";

export default function authMiddleware(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.NotAuthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.NotAuthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.NotAuthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.NotAuthorizedError());
  }
}
