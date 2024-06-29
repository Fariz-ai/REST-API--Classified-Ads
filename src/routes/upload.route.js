/** @format */

const middleware = require("../middlewares/authJwt");
const controller = require("../controllers/upload.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/products/:id/upload",
    middleware.verifyToken,
    controller.upload
  );
  app.delete("/api/image/:id", middleware.verifyToken, controller.remove);
};
