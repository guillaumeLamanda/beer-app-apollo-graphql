import { User } from "@ba/schema";
import { DbDatasource } from "../database/datasource";
import { UserModel } from "../database/user.model";
import { UserBeersModel } from "../database/beer.model";

export class UserDataSource extends DbDatasource {
  async resolveUserBeers(user: UserModel): Promise<User> {
    return {
      ...(user.get() as UserModel),
      beers: await this.context.dataSources.beersApi.getBeersByIds(
        (user.beers || []).map(({ beerId }) => beerId)
      ),
    };
  }

  async findById(id: string): Promise<User> {
    return this.resolveUserBeers(
      await UserModel.findByPk(id, { include: [{ all: true }] })
    );
  }

  async findByName(name: string): Promise<User> {
    const user = await UserModel.findOne({ where: { name } });
    return this.resolveUserBeers(user);
  }

  async find(): Promise<User[]> {
    const users = await UserModel.findAll({ include: [UserBeersModel] });
    return Promise.all(users.map(async (user) => this.resolveUserBeers(user)));
  }

  async create({ name }: { name: string }): Promise<User> {
    const user = await UserModel.create({ name }, { include: [{ all: true }] });
    console.log(user.token);
    return this.resolveUserBeers(user);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await UserModel.findByPk(id, { include: [{ all: true }] });
    await user.update({
      ...data,
      ...(data.beers && data.beers.map(({ id }) => id)),
    });
    return this.resolveUserBeers(user);
  }

  async toogleBeerLike(userId: string, beerId: string): Promise<User> {
    const user = await UserModel.findByPk(userId, { include: [{ all: true }] });
    console.log(user.beers);
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
    await user.save();

    return this.resolveUserBeers(user);
  }
}
