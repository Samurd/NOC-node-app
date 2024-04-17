import { LogDatasource } from "../../domain/datasources/log-datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity,";
import { LogRespository } from "../../domain/repositories/log.repository";

export class LogRepositoryImpl implements LogRespository {
  constructor(private readonly logDatasource: LogDatasource) {}
  async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }
  async getLogs(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(serverityLevel);
  }
}
