const express = require("express");
const db = require("../../pkg/db/index");
const jwt = require("express-jwt");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authHandler = require("./handlers/authHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

db.init();

app.use(jwt.expressjwt({
  algorithms: ["HS256"],
  secret: process.env.JWT_SECRET,
  getToken: (req) => {
      if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer"){
          return req.headers.authorization.split(" ")[1];
      }
      if(req.cookies.jwt){
          return req.cookies.jwt;
      }
      return null; 
  },
  })
  .unless({
      path: ["/api/v1/auth/register", "/api/v1/auth/login"]
  })
);

app.post("/api/v1/auth/register", authHandler.register);
app.post("/api/v1/auth/login", authHandler.login);

app.listen(process.env.PORTAUTH, (err) => {
  if (err) {
    return console.log("Server can not start");
  }
  console.log(`Server started successfully on port ${process.env.PORTAUTH}`);
});
