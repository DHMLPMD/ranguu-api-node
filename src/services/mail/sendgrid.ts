import sendgrid from '@sendgrid/mail'

import { IMailService } from "./interfaces";

export class SendgridService implements IMailService {

    private readonly mailFrom: string

    constructor() {
        sendgrid.setApiKey(process.env.SENDGRID_KEY!)
        this.mailFrom = process.env.MAIL_FROM!
    }

    async sendTextMail(to: string, subject: string, content: string): Promise<number> {
        try {
            const [result] = await sendgrid.send({
                from: this.mailFrom,
                to,
                subject,
                text: content
            })
            
            return result.statusCode
        } catch (error) {
            throw error
        }
    }

}