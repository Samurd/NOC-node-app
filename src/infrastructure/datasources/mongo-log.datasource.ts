import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log-datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity,";

export class MongoLogDataSource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);

    console.log("Mongo log created", newLog);
  }
  async getLogs(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const mongoLogs = await LogModel.find({ level: serverityLevel });

    return mongoLogs.map((mongoLog) => LogEntity.fromObject(mongoLog));
  }
}
