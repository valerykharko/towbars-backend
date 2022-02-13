export default class TokenDto {
  refreshToken;

  constructor(model) {
    this.refreshToken = model.refreshToken;
  }
}
