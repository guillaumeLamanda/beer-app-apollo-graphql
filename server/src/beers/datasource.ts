import { RESTDataSource } from "apollo-datasource-rest";
import { Beer } from "@ba/schema";

/**
 * @see https://punkapi.com/documentation/v2
 */

export class BeersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.punkapi.com/v2/";
  }

  async getBeer(id): Promise<Beer> {
    /**
     * For single beer, punkapi still return an array 😡
     */
    const beer = (await this.get(`beers/${id}`))[0];
    return beer;
  }

  async getBeers({ page = 1, pageSize = 25 }) {
    return this.get(`beers?per_page=${pageSize}&page=${page}`);
  }

  getBeersByIds = (ids: Array<number | string>) => {
    if (!ids.length) return [];
    return this.get(`beers?ids=${ids.join("|")}`);
  };
}
