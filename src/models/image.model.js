/** @format */

module.exports = (sequelize, Sequelize) => {
  const Image = sequelize.define("images", {
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    url_image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Image;
};
