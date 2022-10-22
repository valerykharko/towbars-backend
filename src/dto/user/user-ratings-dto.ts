export default class UserRatingsDto {
  title;
  text;
  value;
  img;
  date;
  id;
  userId;
  ratingId;

  constructor(model) {
    this.title = model.title;
    this.text = model.text;
    this.value = model.value;
    this.img = model.img;
    this.date = model.date;
    this.id = model.id;
    this.userId = model.userId;
    this.ratingId = model.ratingId;
  }
}
