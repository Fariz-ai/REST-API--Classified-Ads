/** @format */

const db = require("../models");
const Category = db.category;

exports.createCategory = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name must be required" });
  }

  Category.create({ name })
    .then((result) => {
      res.status(201).json({
        data: result,
        message: "Category created successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.allCategories = (req, res) => {
  Category.findAll()
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Show all categories success",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.categoryById = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id)
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Show category success",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.updateCategory = (req, res) => {
  const id = req.params.id;

  Category.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          data: num,
          message: "Category updated successfully",
        });
      } else {
        res.status(400).json({
          message: `Cannot update category with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.deleteCategory = (req, res) => {
  const id = req.params.id;

  Category.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          data: num,
          message: "Category deleted successfully",
        });
      } else {
        res.status(400).json({
          message: `cannot delete category with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
