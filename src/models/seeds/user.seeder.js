/** @format */

const db = require("../index");
const User = db.user;

exports.userSeed = () => {
  User.create({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+62 812 1212",
    password: "$2a$08$Ri25LYKfKRAHBBFhh4B0BuRerhMRAuxkW0WbmFMkpWPOEULmKe6hy", //password
  });
};
