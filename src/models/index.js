/** @format */

const db = require("../config/database");

db.user = require("./user.model")(db.sequelize, db.Sequelize);
db.category = require("./category.model")(db.sequelize, db.Sequelize);
db.product = require("./product.model")(db.sequelize, db.Sequelize);
db.image = require("./image.model")(db.sequelize, db.Sequelize);

db.product.hasMany(db.image, { foreignKey: "product_id" });
db.product.belongsTo(db.user, { foreignKey: "user_id" });
db.product.belongsTo(db.category, { foreignKey: "category_id" });

module.exports = db;
