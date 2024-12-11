const Category = require("../../../pkg/category/categorySchema");
const Item = require("../../../pkg/item/itemSchema");

exports.viewAll = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const query = JSON.parse(queryString);
    const categories = await Category.find(query).populate("items");
    res.status(200).json({
      status: "success",
      data: {
        categories,
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
    const category = await Category.findById(req.params.id).populate("items");
    res.status(200).json({
      status: "success",
      data: {
        category,
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
  const { title, image } = req.body;

  try {
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; // Get the path from the uploaded file
    }

    const category = new Category({
      title,
      image: imagePath,
    });

    const createdCategory = await category.save();

    res.status(201).json(createdCategory);
  } catch (error) {
    console.error("Error creating category:", error); // Log the error details
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        category,
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
    const category = await Category.findById(req.params.id);

    for (const item of category.items) {
      await Item.findByIdAndDelete(item._id);
    }

    await Category.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
