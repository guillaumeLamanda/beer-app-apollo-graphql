import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  ForeignKey,
  Default,
} from "sequelize-typescript";
import { UserModel } from "./user.model";

@Table
export class UserBeersModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @PrimaryKey
  @Column(DataType.STRING)
  beerId: string;

  @ForeignKey(() => UserModel)
  userId: string;
}
