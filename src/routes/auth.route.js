/** @format */

const middleware = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/register", middleware.isUserExist, controller.register);
  app.post("/api/auth/login", controller.login);
};
