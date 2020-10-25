import { WebSocketLink } from "apollo-link-ws";
import { isProd, url } from "../../config";

const wsProtocol = isProd ? "wss" : "ws";
const wsLink = new WebSocketLink({
  uri: `${wsProtocol}://${url}${isProd ? "/graphql" : ""}`,
  options: {
    reconnect: true,
  },
});

export default wsLink;
