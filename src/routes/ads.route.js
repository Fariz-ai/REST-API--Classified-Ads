/** @format */

const controller = require("../controllers/ads.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/ads/random", controller.random);
  app.get("/api/ads/:id/detail", controller.detail);
  app.get("/api/ads/search", controller.search);
};
