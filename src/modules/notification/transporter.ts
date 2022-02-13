import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport(
  {
    host: String(process.env.SMTP_HOST),
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  },
  { from: "Towbars <Towbars.by@gmail.com>" }
);

export default transporter;
