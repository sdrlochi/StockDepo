const express = require("express");
const db = require("../../pkg/db/index");
const cors = require("cors");
const jwt = require("express-jwt");

const order = require("./handlers/orderHandler");
const auth = require("./../auth/handlers/authHandler");

const app = express();

db.init();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(
  jwt.expressjwt({
    algorithms: ['HS256'],
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
 }).unless({
    path: ["/api/v1/order"]
  })
);

app.get("/api/v1/order", order.viewAll);
app.get("/api/v1/order/:id", order.viewOne);
app.post("/api/v1/order", order.create);
app.patch("/api/v1/order/:id", order.update);
app.delete("/api/v1/order/:id", order.delete);

app.listen(process.env.PORTORDER, (err) =>{
  if(err){
    return console.log("Server can not start");
  }
  console.log(`Server started successfully on port ${process.env.PORTORDER}`);
});