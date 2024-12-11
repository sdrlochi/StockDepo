const Item = require("../../../pkg/item/itemSchema");
const Category = require("../../../pkg/category/categorySchema");
const Activity = require("../../../pkg/activity/activitySchema");
const Order = require("../../../pkg/order/orderSchema");
const multer = require("multer");
const uuid = require("uuid");

const imageId = uuid.v4();

const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "stock_dolphin/public/img/items");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    callback(null, `item-${imageId}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("File type is not supported"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhoto = upload.single("icon");

exports.viewAll = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const query = JSON.parse(queryString);
    const items = await Item.find(query).populate("category");
    res.status(200).json({
      status: "success",
      data: {
        items,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.viewOne = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("category")
      .populate("order");
    const orders = await Order.findOne({ itemTitle: item.itemTitle });
    res.status(200).json({
      status: "success",
      data: {
        item,
        orders,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.create = async (req, res) => {
  try {
    console.log("creating items", req.body);
    const { itemTitle, icon, categoryTitle } = req.body;

    const category = await Category.findOne({ title: categoryTitle });

    const iconItem = req.file ? req.file.filename : "defaultpp.png";

    const newItem = await Item.create({
      itemTitle,
      icon: iconItem,
      category: category._id,
    });

    console.log(req.body);
    console.log("newItem", newItem);

    const createdActivity = await Activity.create({
      activity: "created",
      itemTitle,
      categoryTitle,
      date: new Date(),
    });

    await Category.findByIdAndUpdate(category._id, {
      $push: { items: newItem._id },
    });

    res.status(201).json({
      status: "success",
      data: {
        item: newItem,
        activity: createdActivity,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { itemTitle, categoryTitle } = req.body;
    console.log("file", req.file);
    if (req.file) {
      const filename = req.file.filename;
      req.body.icon = filename;
    }

    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    const createdActivity = await Activity.create({
      activity: "edited",
      itemTitle,
      categoryTitle,
      date: new Date(),
    });

    res.status(200).json({
      status: "success",
      data: {
        item,
        activity: createdActivity,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    const { itemTitle, category } = item;
    categoryTitle = category.title;

    for (const order of item.order) {
      await Order.findByIdAndDelete(order._id);
    }

    await Item.findByIdAndDelete(req.params.id);

    const createdActivity = await Activity.create({
      activity: "deleted",
      itemTitle,
      categoryTitle,
      date: new Date(),
    });

    res.status(204).json({
      status: "success",
      data: {
        item: null,
        activity: createdActivity,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
