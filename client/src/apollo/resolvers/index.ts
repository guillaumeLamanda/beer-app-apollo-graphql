import { Resolvers } from "apollo-boost";
import { Cache } from "../cache";
import { meQuery } from "../../hooks";
import { MeQuery } from "../../hooks/users/__generated__/MeQuery";

const resolvers: Resolvers = {
  Beer: {
    isLiked: (beer, args, { cache }: { cache: Cache }) => {
      const data = cache.readQuery<MeQuery>({ query: meQuery });
      if (data?.me?.beers.some(({ id }) => id === beer.id)) {
        return true;
      }
      return false;
    },
  },
};

export default resolvers;
