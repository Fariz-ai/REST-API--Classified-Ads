/** @format */

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const __basedir = path.resolve();

const app = express();
dotenv.config();

let whitelist = ["http://localhost:8080"];
let corsOption = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOption));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("storage"));
app.use("/img", express.static(__basedir + "/storage/upload"));

const db = require("./models");
const seed = require("./models/seeds");
db.sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    // seed.userSeed();
    // seed.categorySeed();
    console.log("database connected");
  })
  .catch((err) => {
    console.error("database connection failed.", err.message);
  });

app.get("/", (req, res) => {
  res.json({
    message: "server is running...",
  });
});

require("./routes/auth.route")(app);
require("./routes/profile.route")(app);
require("./routes/product.route")(app);
require("./routes/category.route")(app);
require("./routes/upload.route")(app);
require("./routes/ads.route")(app);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`app running on port http://localhost:${PORT}`);
});
