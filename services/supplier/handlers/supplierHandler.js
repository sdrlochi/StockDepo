const Supplier = require("../../../pkg/supplier/supplierSchema");

exports.viewAll = async (req, res) => {
  try{
    const queryObj = {...req.query};
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,
    (match)=> `$${match}`
    );
    const query = JSON.parse(queryString);
    const suppliers = await Supplier.find(query);
    res.status(200).json({
      status: "success",
      data: {
        suppliers,
      }
    })
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.viewOne = async (req, res) => {
  try{
    const supplier = await Supplier.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        supplier,
      }
    });
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.create = async (req, res) => {
  try{
    const newSupplier = await Supplier.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        supplier: newSupplier,
      },
    });
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  try{
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        supplier,
      }
    });
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.delete = async (req, res) => {
  try{
    await Supplier.findByIdAndDelete(req.params.id);
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