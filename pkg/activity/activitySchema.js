const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  activity: {
    type: String,
    enum: ["all activity", "moved", "edited", "deleted", "created", "ordered"]
  },

  date: {
    type: Date,
    default: Date.now()
  },

  itemTitle: {
    type: String,
  },

  categoryTitle: {
    type: String,
  },

  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }, 
  
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }
})

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;