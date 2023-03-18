//Product.JS to create Product Schema in the application

//Including the required packages and assigning it to Local Variables
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deepPopulate = require("mongoose-deep-populate")(mongoose);
const mongooseAlgolia = require("mongoose-algolia");

//Creating a new Product Schema
const ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  image: String,
  title: String,
  description: String,
  price: Number,
  quantity: Number,
  isDeleted: Boolean,
  created: {
    type: Date,
    default: Date.now
  },
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  },
});




module.exports = mongoose.model("Product", ProductSchema);