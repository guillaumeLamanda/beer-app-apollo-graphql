export const isProd = process.env.NODE_ENV === "production";

export const url = isProd ? "beer-app.lamanda.fr" : "localhost:5000";
