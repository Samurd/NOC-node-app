import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRespository } from "../../domain/repositories/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity,";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

interface Attachement {
  fileName: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;
    try {
      const sentInfo = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      return true;
    } catch (error) {

      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
        <h1>Logs del sistem - NOC</h1>
        <p>non officia ullamco labore culpa consectetur in ex in Lorem sunt. Sint consectetur duis consectetur duis deserunt voluptate dolore sunt minim. Deserunt dolor sit cillum id esse deserunt commodo nisi sint cillum consectetur enim tempor adipisicing.</p>
        `;

    const attachements: Attachement[] = [
      { fileName: "logs-all.log", path: "./logs/logs-all.log" },
      { fileName: "logs-high.log", path: "./logs/logs-high.log" },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachements });
  }
}
