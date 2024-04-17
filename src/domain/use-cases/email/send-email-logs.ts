import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity,";
import { LogRespository } from "../../repositories/log.repository";

interface SendLogEmailUsaCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUsaCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRespository
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) {
        throw new Error("Email log not sent");
      }

      const log = new LogEntity({
        message: "Email log sent",
        level: LogSeverityLevel.low,
        origin: "send-email-logs.ts",
      });

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: "send-email-logs.ts",
      });

      this.logRepository.saveLog(log);
      return false;
    }
  }
}
