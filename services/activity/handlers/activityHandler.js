const Activity = require("../../../pkg/activity/activitySchema");
const Item = require("../../../pkg/item/itemSchema");

exports.viewAll = async (req, res) => {
  try{
    const queryObj = {...req.query};
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,
    (match)=> `$${match}`
    );
    const query = JSON.parse(queryString);
    const activities = await Activity.find(query).populate("item")
    res.status(200).json({
      status: "success",
      data: {
        activities,
      }
    });
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.viewOne = async (req, res) => {
  try{
    const activity = await Activity.findById(req.params.id).populate("item")
    res.status(200).json({
      status: "success",
      data: {
        activity,
      }
    });
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.create = async (req, res) => {
  try{
    const { itemTitle, categoryTitle } = req.body;
    
    const item = await Item.findOne({ itemTitle, categoryTitle });

    const createdActivity = await Activity.create({
      item: item._id,
      date: new Date(),
    });

    res.status(201).json({
      status: "success",
      data: {
        createdActivity,
      },
    });

  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        activity,
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
  try{
    await Activity.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

