const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemTitle: {
    type: String,
  },

  categoryTitle: {
    type: String,
  },

  icon: {
    type: String,
    default: "defaultpp.png"
  },

  date: {
    type: Date,
    default: Date.now()
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },

  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  },
    
  order: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }]
})

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;