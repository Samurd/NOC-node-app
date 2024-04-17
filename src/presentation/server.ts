// Datasources
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";

//Repositories
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl.";

// Use cases
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service.multiple";

//Presentation
import { CronService } from "./cron/cron-service";

// Here we can change the log datasource that could be Mongo or FileSystem or Postgres
const fslogRepository = new LogRepositoryImpl(new FileSystemDatasource());

const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

export class ServerApp {
  public static async start() {
    console.log("Starting server...");

    CronService.createJob("*/5 * * * * *", () => {

      const url = "https://google.com";

      new CheckServiceMultiple(
        [fslogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);

    });



  }
}
