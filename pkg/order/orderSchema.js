const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  quantity: {
    type: Number,
  },

  totaPrice: {
    type: Number,
  },

  pricePerUnit: {
    type: Number,
  },

  ordered: {
    type: Date,
    default: Date.now()
  },
  
  supplierName: {
    type: String,
  },

  itemTitle: {
    type: String,
  },

  categoryTitle: {
    type: String,
  },

  icon:{
    type: String,
  },

  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },

  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier"
  },

  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }
})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;