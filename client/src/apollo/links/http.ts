import { createHttpLink } from "apollo-link-http";
import { httpGraphQlUrl } from "../../config";

const httpLink = createHttpLink({
  uri: httpGraphQlUrl,
});

export default httpLink;
