const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  address: {
    type: String,
  },
  
  phoneNumber: {
    type: Number,
  },

  email: {
    type: String,
  }
  
});

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;