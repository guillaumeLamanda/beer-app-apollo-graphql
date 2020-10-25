import { InMemoryCache } from "apollo-boost";

export type Cache = InMemoryCache;

const cache = new InMemoryCache();

cache.writeData({
  data: {
    beers: [],
  },
});

export default cache;
