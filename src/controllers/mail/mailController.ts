import mailService from "../../services/mail/mailService";

export default class MailController {
  static async getMailAboutRequestCall(req, res, next) {
    try {
      const { phoneNumber } = req.query;
      await mailService.sendCallRequest(phoneNumber);
      return res.send("Запрос отправлен");
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}
