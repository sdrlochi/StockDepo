const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use("/uploads", express.static(uploadsDir));

const authProxy = proxy("http://localhost:9000", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/auth${req.url}`;
  },
});

const categoryProxy = proxy("http://localhost:9001", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/category${req.url}`;
  },
});

const itemProxy = proxy("http://localhost:9003", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/item${req.url}`;
  },
});

const orderProxy = proxy("http://localhost:9005", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/order${req.url}`;
  },
});

const supplierProxy = proxy("http://localhost:9007", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/supplier${req.url}`;
  },
});

const activityProxy = proxy("http://localhost:9009", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/activity${req.url}`;
  },
});

app.use("/api/v1/auth/", authProxy);
app.use("/api/v1/category/", categoryProxy);
app.use("/api/v1/item/", itemProxy);
app.use("/api/v1/order/", orderProxy);
app.use("/api/v1/supplier/", supplierProxy);
app.use("/api/v1/activity/", activityProxy);

app.listen(9010, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Proxy service started on port 9010");
});
