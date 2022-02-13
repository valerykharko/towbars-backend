import mailer from "./transporter";
const ApiError = require("error/ApiError");

export default class MailSenderController {
  private static order: any;

  static async create(req, res, next) {
    try {
      const message = {
        to: req.body.email,
        subject: "Заявка на покупку",
        text: "Hello world?",
        html: `
          <h2>Поздравляем! Вы оформили заявку на покупку товара на сайте компании FarkopBuy</h2>
          <i>Ваши личные данные:<i/>
          <ul>
          <li>ФИО: ${req.body.fio}</li>
          <li>email: ${req.body.email}</li>
          </ul>
          <i>Данные о Вашем автомобиле:<i/>
          <ul>
          <li>марка: ${req.body.brand}</li>
          <li>модель: ${req.body.model}</li>
          <li>поколение: ${req.body.generation}</li>
          <li>тип кузова: ${req.body.body_style}</li>
          </ul>
          <i>Выбранный товар:<i/>
          <ul>
          <li>${req.body.farkopBrand} ${req.body.farkop}</li>
          <li>${req.body.wiringKitBrand} ${req.body.wiringKit}</li>
          <li>${req.body.accessoryBrand} ${req.body.accessory}</li>
          </ul>
          <p>Данное письмо не требует ответа</p>`,
      };
      mailer(message);
      this.order = req.body;
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  static async open(req, res) {
    if (typeof this.order !== "object") return "Привет";
    res.send(
      "Запрос на покупку товара был отправлен отделу по продаже FarkopBuy. Наши специалисты свяжутся с Вами в течении 10 минут"
    );
    this.order = undefined;
  }
}
