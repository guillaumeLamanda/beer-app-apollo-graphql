import { User } from "@ba/schema";
import { DbDatasource } from "../database/datasource";
import { UserModel } from "../database/user.model";
import { UserBeersModel } from "../database/beer.model";

export class UserDataSource extends DbDatasource {
  async findById(id: string) {
    return UserModel.findByPk(id, { include: [{ all: true }] });
  }

  async findByName(name: string) {
    return UserModel.findOne({ where: { name } });
  }

  async find() {
    return UserModel.findAll({ include: [UserBeersModel] });
  }

  async create({ name }: { name: string }) {
    return UserModel.create({ name }, { include: [{ all: true }] });
  }

  async update(id: string, data: Partial<User>) {
    const user = await UserModel.findByPk(id, { include: [{ all: true }] });
    return user.update({
      ...data,
      ...(data.beers && data.beers.map(({ id }) => id)),
    });
  }

  async toogleBeerLike(userId: string, beerId: string) {
    const user = await UserModel.findByPk(userId, { include: [{ all: true }] });
    if (
      user.beers.some(({ beerId: storedBeerId }) => storedBeerId === beerId)
    ) {
      console.log("to destroy");
      const beer = await user.beers.find(
        ({ beerId: storedBeerId }) => storedBeerId === beerId
      );
      await beer.destroy();
      user.set(
        "beers",
        user.beers.filter(({ beerId: storedBeerId }) => storedBeerId !== beerId)
      );
    } else {
      const beer = await UserBeersModel.create({
        beerId,
        userId,
      });
      user.set("beers", [...user.beers, beer]);
    }
    return user.save();
  }
}
