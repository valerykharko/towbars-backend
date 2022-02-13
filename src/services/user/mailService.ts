import transporter from "../../modules/notification/transporter";

export default class MailService {
  static async sendActivationMail(to, link) {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта на " + process.env.API_URL,
      text: "",
      html: `
            <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>
      `,
    });
  }
}
