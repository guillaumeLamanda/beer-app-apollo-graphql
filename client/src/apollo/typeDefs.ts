import { gql } from "apollo-boost";

const typeDefs = gql`
  extend type Beer {
    isLiked: Boolean!
  }
`;

export default typeDefs;
