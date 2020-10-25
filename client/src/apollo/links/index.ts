import { split } from "apollo-boost";
import { getMainDefinition } from "apollo-utilities";
import authLink from "./auth";
import httpLink from "./http";
import wsLink from "./ws";

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export default link;
