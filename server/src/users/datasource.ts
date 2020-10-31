import { User } from "@ba/schema";
import { DbDatasource } from "../database/datasource";

export class UserDataSource extends DbDatasource {
  async findById(id: string) {
    return this.db.user.findOne({ where: { id }, include: { beers: true } });
  }

  async findByName(name: string) {
    return this.db.user.findOne({ where: { name } });
  }

  async find() {
    return this.db.user.findMany();
  }

  async create({ name }: { name: string }) {
    return this.db.user.create({ data: { name } });
  }

  async update(id: string, data: Partial<User>) {
    return this.db.user.update({
      where: { id },
      data: {
        ...data,
        ...(data.beers && {
          beers: {
            set: data.beers.map(({ id }) => ({
              id,
            })),
          },
        }),
      },
    });
  }

  async toogleBeerLike(userId: string, beerId: string) {
    const user = await this.db.user.findOne({
      where: { id: userId },
      select: {
        beers: {
          select: {
            id: true,
          },
        },
      },
    });
    const beers = user.beers.some(({ id }) => id === beerId)
      ? user.beers.filter(({ id }) => id !== beerId)
      : [...user.beers, { id: beerId }];

    this.db.user.update({
      where: { id: userId },
      data: {
        beers: {
          set: beers,
        },
      },
    });

    return this.findById(userId);
  }
}
