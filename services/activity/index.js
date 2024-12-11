const express = require("express");
const db = require("../../pkg/db/index");
const cors = require("cors");
const jwt = require("express-jwt");

const activity = require("./handlers/activityHandler");

const app = express();

db.init();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
    path: ["/api/v1/activity"]
  })
);

app.get("/api/v1/activity", activity.viewAll);
app.get("/api/v1/activity/:id", activity.viewOne);
app.post("/api/v1/activity", activity.create);
app.patch("/api/v1/activity/:id", activity.update);
app.delete("/api/v1/activity/:id", activity.delete);

app.listen(process.env.PORTACTIVITY, (err)=>{
  if(err){
    return console.log("Server can not start");
  }
  console.log(`Server started successfully on port ${process.env.PORTACTIVITY}`);
});