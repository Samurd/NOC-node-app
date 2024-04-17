import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log-datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity,";

const prisma = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};
export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];
    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level,
      },
    });

    console.log(newLog);
  }
  async getLogs(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const dbLogs = await prisma.logModel.findMany({
      where: {
        level: severityEnum[serverityLevel],
      },
    });

    return dbLogs.map((logPrisma) => LogEntity.fromObject(logPrisma));
  }
}
