import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Sequelize } from "sequelize-typescript";
import { Context } from "..";
import { __Directive } from "graphql";
import { UserModel } from "./user.model";
import { UserBeersModel } from "./beer.model";

let sequelize: Sequelize;
if (!sequelize) {
  sequelize = new Sequelize({
    database: "db",
    dialect: "sqlite",
    storage: "./db.sqlite",
    models: [UserModel, UserBeersModel],
  });
  sequelize.sync();
}

export class DbDatasource extends DataSource {
  context: Context;
  db: Sequelize;

  async initialize(config: DataSourceConfig<Context>) {
    this.db = sequelize;
    this.context = config.context;
  }
}
