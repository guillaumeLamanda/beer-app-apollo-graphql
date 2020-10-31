export const isProd = process.env.NODE_ENV === "production";

export const httpGraphQlUrl = isProd ? "/graphql" : "http://localhost:5000";
export const wsGraphQlUrl = isProd ? "wss://graphql" : "ws://localhost:5000";
