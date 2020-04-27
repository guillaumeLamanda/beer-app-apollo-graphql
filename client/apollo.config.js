module.exports = {
  client: {
    service: {
      name: "beer-app",
      url: "http://localhost:5000",
    },
    includes: ["./src/App.tsx", "./src/hooks/**/*.ts"],
  },
};
