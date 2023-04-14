export interface IMailService {
    sendTextMail(to: string, subject: string, content: string): Promise<number>
}