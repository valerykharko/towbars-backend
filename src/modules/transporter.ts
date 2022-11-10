import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: { user: "towbar.by@yandex.by", pass: "olraxumqnwnfdbkj" },
});

export default transporter;
