import { LogEntity, LogSeverityLevel } from "../../entities/log.entity,";
import { LogRespository } from "../../repositories/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRespository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callSaveLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: "check-service.ts",
      });
      this.callSaveLogs(log);
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const erorMessage = `${url} isn't ok ${error}`;
      const log = new LogEntity({
        message: erorMessage,
        level: LogSeverityLevel.high,
        origin: "check-service.ts",
      });
      this.callSaveLogs(log);
      this.errorCallback && this.errorCallback(`${error}`);
      return false;
    }
  }
}
