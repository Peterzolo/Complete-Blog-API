const Categories = require("../models/CategoriesModel");
const Category = require("../models/CategoriesModel");

exports.createCategory = async(req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).send(savedCat);
  } catch (err) {
    res.status(500).send(err);
  }
};


exports.getAllGategories = async(rreq, res) =>{
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
      } catch (err) {
        res.status(500).json(err);
      }
}