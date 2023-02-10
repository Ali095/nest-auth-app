import { Injectable, Logger } from "@nestjs/common";
import { NotImplementedException } from "@nestjs/common/exceptions/not-implemented.exception";
import { ConfigService } from "@nestjs/config";
import * as SendGrid from "@sendgrid/mail";
import { MailData, EmailResponse, EmailType } from "./_types";

@Injectable()
export class SendgridService {
	constructor(private readonly configService: ConfigService) {
		SendGrid.setApiKey(this.configService.get<string>("SENDGRID_API_KEY"));
	}

	private async sendMail(mail: SendGrid.MailDataRequired): Promise<any> {
		Logger.log(`Email successfully dispatched to ${mail.to}`, "Email Service");
		try {
			const res = await SendGrid.send({
				to: "hassanali5062@gmail.com",
				from: "hali@epik.io",
				subject: "Sending with SendGrid is Fun",
				text: "and easy to do anywhere, even with Node.js",
				html: "<strong>and easy to do anywhere, even with Node.js</strong>",
			});
			return res;
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	public async sendMailToSingleUser(mailData: MailData, type: EmailType): Promise<any> {
		try {
			const res = await SendGrid.send({
				to: "hassanali5062@gmail.com",
				from: "hali@epik.io",
				subject: "Sending with SendGrid is Fun",
				text: "and easy to do anywhere, even with Node.js",
				html: "<strong>and easy to do anywhere, even with Node.js</strong>",
			});
			return res;
		} catch (e) {
			console.log(e);
			throw e;
		}
	}
}
