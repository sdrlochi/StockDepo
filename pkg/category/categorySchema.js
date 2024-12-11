const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  image: {
    type: String,
    required: true,
  },

  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
