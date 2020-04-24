import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  Default,
  DataType,
  Unique,
} from "sequelize-typescript";
import { UserBeersModel } from "./beer.model";

@Table
export class UserModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Unique
  @Column
  name: string;

  @Column
  token?: string;

  @HasMany(() => UserBeersModel)
  beers: UserBeersModel[];
}
