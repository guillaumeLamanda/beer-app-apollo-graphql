import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Context } from "../context";
import { PrismaClient } from "@prisma/client";

export class DbDatasource extends DataSource {
  context: Context;
  db: PrismaClient;

  async initialize(config: DataSourceConfig<Context>) {
    this.db = new PrismaClient({
      log: ["query", "error", "info", "warn"],
    });
    this.context = config.context;
  }
}
