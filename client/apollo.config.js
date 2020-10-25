module.exports = {
  client: {
    service: {
      name: "beer-app",
      url: "http://localhost:5000",
    },
    includes: ["./src/apollo/**/*.ts", "./src/hooks/**/*.ts"],
  },
};
