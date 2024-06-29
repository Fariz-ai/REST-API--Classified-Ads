/** @format */

const db = require("../models");
const Product = db.product;
const Image = db.image;
const User = db.user;
const Op = db.Sequelize.Op;

exports.random = (req, res) => {
  Product.findAll({
    where: {
      sold: false,
    },
    limit: 10,
    order: db.sequelize.literal("rand()"),
    include: Image,
  })
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Show random products success",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.detail = (req, res) => {
  id = req.params.id;

  Product.findByPk(id, {
    include: [
      { model: Image, as: "images" },
      {
        model: User,
        as: "user",
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      },
    ],
  })
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Show product success",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.search = (req, res) => {
  const { title } = req.query;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Product.findAll({
    where: { sold: false, ...condition },
    limit: 10,
    include: Image,
  })
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Show list of products successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
