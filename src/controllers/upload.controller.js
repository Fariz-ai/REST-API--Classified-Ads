/** @format */

const fs = require("fs");
const { uploadFile, __basedir } = require("../services/upload");
const db = require("../models");
const Image = db.image;

exports.upload = async (req, res) => {
  const id = req.params.id;

  try {
    await uploadFile(req, res);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload a file!" });
    }

    let images = req.files.map((item) => {
      return {
        product_id: id,
        url_image: item.filename,
      };
    });

    Image.bulkCreate(images)
      .then((result) => {
        res.status(201).json({ message: "Uploaded files successfully" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Uploaded files failed" });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

exports.remove = (req, res) => {
  const id = req.params.id;

  Image.findByPk(id)
    .then((data) => {
      fs.unlink(
        __basedir + `/storage/upload/${data.url_image}`,
        function (err) {
          if (err) {
            throw res.status(500).json({ message: "Delete image failed!" });
          }
        }
      );

      Image.destroy({
        where: {
          id: id,
        },
      })
        .then((num) => {
          if (num == 1) {
            res
              .status(200)
              .json({ message: "Image was deleted successfully!" });
          } else {
            res
              .status(500)
              .json({ message: `Cannot delete image with id ${id}.` });
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
