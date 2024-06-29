/** @format */

const db = require("../models");
const { getPagination, getPagingData } = require("../services/pagination");
const Product = db.product;
const Image = db.image;

exports.create = (req, res) => {
  const requiredFields = [
    "category_id",
    "title",
    "brand",
    "model",
    "year",
    "condition",
    "price",
    "description",
    "address",
    "loc_latitude",
    "loc_longitude",
    "sold",
  ];

  for (const field of requiredFields) {
    if (
      req.body[field] === undefined ||
      req.body[field] === null ||
      req.body[field] === ""
    ) {
      res.status(400).json({
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } must be required`,
      });
      return;
    }
  }

  const product = { user_id: req.userId, ...req.body };

  Product.create(product)
    .then((result) => {
      res.status(201).json({
        data: result,
        message: "Product created successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.allProducts = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Product.findAndCountAll({
    limit,
    offset,
    include: Image,
  })
    .then((result) => {
      const response = getPagingData(result, page, limit);
      res.status(200).json({
        ...response,
        message: "Show all products success",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.productById = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id, { include: Image })
    .then((result) => {
      if (result.user_id != req.userId) {
        res.status(401).json({ message: "Unauthorized data product" });
        return;
      }
      res.status(200).json({
        data: result,
        message: "Show product success",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then((result) => {
      if (result.user_id != req.userId) {
        res.status(401).json({ message: "Unauthorized data product" });
        return;
      }

      Product.update(req.body, {
        where: {
          id: id,
        },
      })
        .then((num) => {
          if (num == 1) {
            res.status(200).json({
              data: num,
              message: "Product updated successfully",
            });
          } else {
            res.status(400).json({
              message: `Cannot update product with id ${id}`,
            });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then((result) => {
      if (result.user_id != req.userId) {
        res.status(401).json({ message: "Unauthorized data product" });
        return;
      }

      Product.destroy({
        where: {
          id: id,
        },
      })
        .then((num) => {
          if (num == 1) {
            res.status(200).json({
              data: num,
              message: "Product deleted successfully",
            });
          } else {
            res.status(400).json({
              message: `cannot delete product with id ${id}`,
            });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
