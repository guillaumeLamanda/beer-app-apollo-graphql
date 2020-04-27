import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Sequelize } from "sequelize-typescript";
import { __Directive } from "graphql";
import { UserModel } from "./user.model";
import { UserBeersModel } from "./beer.model";
import { Context } from "../context";

let sequelize: Sequelize;
(async () => {
  if (!sequelize) {
    sequelize = new Sequelize({
      database: "db",
      dialect: "sqlite",
      storage:
        process.env.NODE_ENV === "production" ? "/tmp/db.sqite" : "./db.sqlite",
      models: [UserModel, UserBeersModel],
    });
    await sequelize.sync();
  }
})();

export class DbDatasource extends DataSource {
  context: Context;
  db: Sequelize;

  async initialize(config: DataSourceConfig<Context>) {
    this.db = sequelize;
    this.context = config.context;
  }
}
