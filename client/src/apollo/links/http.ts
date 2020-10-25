import { createHttpLink } from "apollo-link-http";
import { isProd, url } from "../../config";

const protocol = isProd ? "https" : "http";

const httpLink = createHttpLink({
  uri: `${protocol}://${url}${isProd ? "/graphql" : ""}`,
});

export default httpLink;
