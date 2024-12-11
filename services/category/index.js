const express = require("express");
const db = require("../../pkg/db/index");
const cors = require("cors");
const jwt = require("express-jwt");

const category = require("./handlers/categoryHandler");
const auth = require("./../auth/handlers/authHandler");
const upload = require("../middleware/uploadMiddleware");

const app = express();

db.init();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  jwt
    .expressjwt({
      algorithms: ["HS256"],
      secret: process.env.JWT_SECRET,
      getToken: (req) => {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
          return req.headers.authorization.split(" ")[1];
        }
        if (req.cookies.jwt) {
          return req.cookies.jwt;
        }
        return null;
      },
    })
    .unless({
      path: [],
    })
);

app.get("/api/v1/category", category.viewAll);
app.get("/api/v1/category/:id", category.viewOne);
app.post(
  "/api/v1/category",
  auth.restrict("admin"),
  upload.single("image"),
  category.create
);
app.patch("/api/v1/category/:id", category.update);
app.delete("/api/v1/category/:id", auth.restrict("admin"), category.delete);

app.listen(process.env.PORTCATEGORY, (err) => {
  if (err) {
    return console.log("Server can not start");
  }
  console.log(
    `Server started successfully on port ${process.env.PORTCATEGORY}`
  );
});
