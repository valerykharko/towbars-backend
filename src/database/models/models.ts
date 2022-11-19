import Sequelize, { DataTypes } from "sequelize";
import sequelize from "../../database/db";

export const Token: any = sequelize.define("token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING(500), allowNull: false },
});

export const User: any = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING },
  secondName: { type: DataTypes.STRING },
  patronymic: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: { msg: "Invalid value" },
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: { type: DataTypes.STRING },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

export const Order: any = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  items: { type: DataTypes.ARRAY(Sequelize.JSON), allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now() },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Заявка в обработке",
  },
  userData: { type: DataTypes.JSON, allowNull: false },
  shipment_date: { type: DataTypes.STRING, allowNull: true },
  totalPrice: { type: DataTypes.INTEGER, allowNull: false },
  totalCount: { type: DataTypes.INTEGER, allowNull: false },
});

export const Basket: any = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  items: { type: DataTypes.ARRAY(Sequelize.JSON), allowNull: true },
  totalPrice: { type: DataTypes.INTEGER, allowNull: true },
  totalCount: { type: DataTypes.INTEGER, allowNull: true },
});

export const Towbar: any = sequelize.define("towbar", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendor_code: { type: DataTypes.STRING, allowNull: false },
  max_hor: { type: DataTypes.INTEGER, allowNull: false },
  max_ver: { type: DataTypes.INTEGER, allowNull: false },
  ball_type: { type: DataTypes.STRING, allowNull: false },
  cutout: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  removing_bumper: { type: DataTypes.BOOLEAN, allowNull: true },
  dismantling_amplifier: { type: DataTypes.BOOLEAN, allowNull: true },
  drilling: { type: DataTypes.STRING, allowNull: true },
  installation_time: { type: DataTypes.FLOAT, allowNull: true },
  weight: { type: DataTypes.FLOAT, allowNull: true },
  with_cap: { type: DataTypes.BOOLEAN, allowNull: true },
  with_electrical: { type: DataTypes.BOOLEAN, allowNull: true },
  visible: { type: DataTypes.BOOLEAN, allowNull: false },
  img: { type: DataTypes.ARRAY(Sequelize.STRING), allowNull: true },
  doc: { type: DataTypes.ARRAY(Sequelize.STRING), allowNull: true },
  video_link: { type: DataTypes.ARRAY(Sequelize.STRING), allowNull: true },
  description: { type: DataTypes.STRING(3000), allowNull: true },
  note: { type: DataTypes.STRING, allowNull: true },
});

export const Auto: any = sequelize.define("auto", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export const Brand: any = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  visible: { type: DataTypes.BOOLEAN, allowNull: false },
});

export const Model: any = sequelize.define("model", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  visible: { type: DataTypes.BOOLEAN, allowNull: false },
});

export const Generation: any = sequelize.define("generation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  year_of_issue: { type: DataTypes.STRING, allowNull: true },
  visible: { type: DataTypes.BOOLEAN, allowNull: true },
});

export const BodyStyle: any = sequelize.define("body_style", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

export const Manufacturer: any = sequelize.define("manufacturer", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.ARRAY(Sequelize.STRING), allowNull: true },
  doc: { type: DataTypes.ARRAY(Sequelize.STRING), allowNull: true },
  description: { type: DataTypes.STRING(3000), allowNull: true },
});

User.hasOne(Token);
Token.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasOne(Basket);
Basket.belongsTo(User);

Brand.hasMany(Model);
Model.belongsTo(Brand);

Model.hasMany(Generation);
Generation.belongsTo(Model);

Brand.hasMany(Auto);
Auto.belongsTo(Brand);

Model.hasMany(Auto);
Auto.belongsTo(Model);

Generation.hasMany(Auto);
Auto.belongsTo(Generation);

BodyStyle.hasMany(Auto);
Auto.belongsTo(BodyStyle);

Auto.hasMany(Towbar);
Towbar.belongsTo(Auto);

Manufacturer.hasMany(Towbar);
Towbar.belongsTo(Manufacturer);
