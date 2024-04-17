

export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  message: string;
  level: LogSeverityLevel;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor({
    message,
    level,
    origin,
    createdAt = new Date(),
  }: LogEntityOptions) {
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json);
    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });
    log.createdAt = new Date(createdAt);
    return log;
  };

  static fromObject = (obj: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = obj;

    const log = new LogEntity({
      message,
      level,
      origin,
    });

    return log;
  };
}
