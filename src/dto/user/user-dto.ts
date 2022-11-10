export default class UserDto {
  firstName;
  secondName;
  patronymic;
  country;
  city;
  phoneNumber;
  email;
  role;
  isActivated;
  id;

  constructor(model) {
    this.firstName = model.firstName;
    this.secondName = model.secondName;
    this.patronymic = model.patronymic;
    this.country = model.country;
    this.city = model.city;
    this.phoneNumber = model.phoneNumber;
    this.email = model.email;
    this.role = model.role;
    this.isActivated = model.isActivated;
    this.id = model.id;
  }
}
