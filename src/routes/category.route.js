/** @format */

const middleware = require("../middlewares/authJwt");
const controller = require("../controllers/category.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/categories",
    middleware.verifyToken,
    controller.createCategory
  );
  app.get("/api/categories", middleware.verifyToken, controller.allCategories);
  app.get(
    "/api/categories/:id",
    middleware.verifyToken,
    controller.categoryById
  );
  app.patch(
    "/api/categories/:id",
    middleware.verifyToken,
    controller.updateCategory
  );
  app.delete(
    "/api/categories/:id",
    middleware.verifyToken,
    controller.deleteCategory
  );
};
