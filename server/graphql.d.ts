declare module "*.graphql" {
  import { DocumentNode } from "server/graphql";
  const Schema: DocumentNode;

  export = Schema;
}
