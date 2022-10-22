export default class UserDto {
  firstName;
  secondName;
  email;
  phoneNumber;
  role;
  isActivated;
  id;
  autoId;

  constructor(model) {
    this.firstName = model.firstName;
    this.secondName = model.secondName;
    this.email = model.email;
    this.phoneNumber = model.phoneNumber;
    this.role = model.role;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.autoId = model.autoId;
  }
}
