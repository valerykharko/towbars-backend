import transporter from "../../modules/notification/transporter";

export default class MailService {
  static async sendActivationMail(to, link) {
    await transporter.sendMail({
      from: "towbar.by@yandex.by",
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

  static async sendCallRequest(phoneNumber) {
    await transporter.sendMail({
      from: "towbar.by@yandex.by",
      to: "towbar.by@yandex.by",
      subject: "Запрос на обратный звонок",
      text: "",
      html: `
    <div class="container">
      <div>
        <div>
          <h1>Запрос на обратный звонок</h1>
          <p>
            Вам пришел запрос на обратный звонок на номер: +${phoneNumber}
          </p>
        </div>
      </div>
    </div>
`,
    });
  }
}
