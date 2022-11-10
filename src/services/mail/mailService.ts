import transporter from "../../modules/transporter";

export default class MailService {
  static async sendActivationMail(to, link) {
    await transporter.sendMail({
      from: "towbar.by@yandex.by",
      to,
      subject: "Активация аккаунта на " + process.env.API_URL,
      text: "",
      html: `
            <div>
                <h1>Для активации нажмите на ссылку</h1>
                <a href="${link}">Ссылка для активации аккаунта</a>
            </div>
      `,
    });
  }

  static async sendCallRequest(phoneNumber) {
    await transporter.sendMail({
      from: "towbar.by@yandex.by",
      to: "1870012@mail.ru",
      subject: "Запрос на обратный звонок",
      text: "",
      html: `
    <div class="container">
      <div>
        <div>
          <h1>Заказать звонок</h1>
          <p>
            Вам пришел запрос на обратный звонок на номер: +${phoneNumber}
          </p>
        </div>
      </div>
    </div>
`,
    });
  }

  static async sendOrderRequest(order, user) {
    const items = order.items
      .map(function (element) {
        return `
    <ul>
    <li>Артикул: ${element.items[0].vendor_code}</li>
    <li>Цена: ${element.items[0].price} руб.</li>
    <li>Количество: ${element.items.length}</li>
    </ul>
    `;
      })
      .join("\n");

    function padStr(i) {
      return i < 10 ? "0" + i : "" + i;
    }

    const date =
      padStr(order.date.getDate()) +
      "." +
      padStr(1 + order.date.getMonth()) +
      "." +
      padStr(order.date.getFullYear()) +
      " ";

    const time =
      padStr(order.date.getHours()) +
      ":" +
      padStr(order.date.getMinutes()) +
      ":" +
      padStr(order.date.getSeconds());

    await transporter.sendMail({
      from: "towbar.by@yandex.by",
      to: user.email,
      subject: `Заявка №${100 + order.id} от ${date}`,
      text: "",
      html: `
        <div>
          <div>
            <div>
              <h3>Заявка №${100 + order.id} от ${date}</h3>
              <p>
                Здравствуйте, Ваша заявка поступила в работу к нашему специалисту, который проверит заказ и в течение 24 часов свяжется с Вами для уточнения и согласования условий отгрузки.
              </p>
            </div>
            <div>
                <span>Личные данные:</span>
                <ul>
                    <li>Фамилия: ${order.userData.surname}</li>
                    <li>Имя: ${order.userData.name}</li>
                    <li>Отчество: ${
                      order.userData.patronymic && order.userData.patronymic
                    }</li>
                    <li>Страна: ${order.userData.country}</li>
                    <li>Город: ${order.userData.city}</li>
                    <li>Номер телефона: +${order.userData.telNumber}</li>
                </ul>
            </div>
            <div>
                <span>Заявка:</span>
                ${items}
                <div>
                    <strong>Общее количество: ${order.totalCount} шт.</strong>
                </div>
                </div>
                <div>
                    <strong>Общая стоимость: ${order.totalPrice} руб.</strong>
                </div>
            </div>
            <br/>
            <div>
                <p>Данное письмо сформированно автоматически и не предполагает ответа. Пожалуйста, не отвечайте на него</p>
                <span>Для связи с нами используйте почту 1870012@mail.ru</span>
            </div>
            <br/>
            <div>
                <i>Свой автомобиль фаркопом оснастите и груз любой надёжно прицепите!</i>
            </div>
        </div>
    `,
    });

    await transporter.sendMail({
      from: "towbar.by@yandex.by",
      to: "1870012@mail.ru",
      subject: `Заявка №${100 + order.id} | ${order.userData.surname} ${
        order.userData.name
      }`,
      text: "",
      html: `
        <div>
          <div>
            <div>
              <h3>Заявка №${100 + order.id} от ${date} ${time}</h3>
              <p>
                Здравствуйте, Ваша заявка поступила в работу к нашему специалисту, который проверит заказ и в течение 24 часов свяжется с Вами для уточнения и согласования условий отгрузки.
              </p>
            </div>
            <div>
                <span>Личные данные:</span>
                <ul>
                    <li>Фамилия: ${order.userData.surname}</li>
                    <li>Имя: ${order.userData.name}</li>
                    <li>Отчество: ${
                      order.userData.patronymic && order.userData.patronymic
                    }</li>
                    <li>Страна: ${order.userData.country}</li>
                    <li>Город: ${order.userData.city}</li>
                    <li>Номер телефона: +${order.userData.telNumber}</li>
                </ul>
            </div>
            <div>
                <span>Пользователь</span>
                <ul>
                    <li>Email: ${user.email}</li>
                    <li>Фамилия: ${user.firstName}</li>
                    <li>Имя: ${user.secondName}</li>
                    <li>Отчество: ${user.patronymic && user.patronymic}</li>
                    <li>Страна: ${user.country}</li>
                    <li>Город: ${user.city}</li>
                    <li>Номер телефона: +${user.telNumber}</li>
                </ul>
            </div>
            <div>
                <span>Заявка:</span>
                ${items}
                <div>
                    <strong>Общее количество: ${order.totalCount} шт.</strong>
                </div>
                </div>
                <div>
                    <strong>Общая стоимость: ${order.totalPrice} руб.</strong>
                </div>
            </div>
            <br/>
            <div>
                <p>Данное письмо сформированно автоматически и не предполагает ответа. Пожалуйста, не отвечайте на него.</p>
                <span>Для связи с нами используйте почту 1870012@mail.ru</span>
            </div>
            <br/>
            <div>
                <i>Свой автомобиль фаркопом оснастите и груз любой надёжно прицепите!</i>
            </div>
        </div>
    `,
    });
  }
}
