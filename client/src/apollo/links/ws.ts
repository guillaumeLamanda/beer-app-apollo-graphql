import { WebSocketLink } from "apollo-link-ws";
import { wsGraphQlUrl } from "../../config";

const wsLink = new WebSocketLink({
  uri: wsGraphQlUrl,
  options: {
    reconnect: true,
  },
});

export default wsLink;
