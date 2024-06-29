/** @format */

const db = require("../models");
const User = db.user;

profile = (req, res) => {
  User.findByPk(req.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.status(200).json({
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

module.exports = { profile };
