const express = require("express");
const db = require("../../pkg/db/index");
const cors = require("cors");
const jwt = require("express-jwt");

const supplier = require("./handlers/supplierHandler");

const app = express();

db.init();
app.use(cors());
app.use(express.json());
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
    path: ["/api/v1/supplier"]
})
);

app.get("/api/v1/supplier", supplier.viewAll);
app.get("/api/v1/supplier/:id", supplier.viewOne);
app.post("/api/v1/supplier", supplier.create);
app.put("/api/v1/supplier/:id", supplier.update);
app.delete("/api/v1/supplier/:id", supplier.delete);

app.listen(process.env.PORTSUPPLIER, (err) =>{
  if(err){
    return console.log("Server can not start");
  }
  console.log(`Server started successfully on port ${process.env.PORTSUPPLIER}`);
});