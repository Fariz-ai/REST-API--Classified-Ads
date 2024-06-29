/** @format */

const middleware = require("../middlewares/authJwt");
const controller = require("../controllers/product.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/products", middleware.verifyToken, controller.create);
  app.get("/api/products", middleware.verifyToken, controller.allProducts);
  app.get("/api/products/:id", middleware.verifyToken, controller.productById);
  app.patch("/api/products/:id", middleware.verifyToken, controller.update);
  app.delete("/api/products/:id", middleware.verifyToken, controller.delete);
};
