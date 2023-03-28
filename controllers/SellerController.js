const Product = require("../models/productModel");
const hoaxer = require("hoaxer");


class SellerController {
  static async getProducts(req, res, next) {
    try {
      const products = await Product.find({ owner: req.decoded.user._id })
        .populate("owner")
        .populate("category")
        .exec();
  
      res.render("seller", { 
        title: "Seller Products", 
        product: products 
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to get products.");
    }
  }

  // Find a product by ID
static async findProductById(req, res, next) {
  try {
    const result = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      { isDeleted: true }
    ).exec();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to update product.");
  }
}

// Add a new product
static async addProduct(req, res, next) {
  const product = new Product();
  product.owner = req.decoded.user._id;
  product.category = req.body.categoryId;
  product.title = req.body.title;
  product.price = req.body.price;
  product.quantity = req.body.quantity;
  product.description = req.body.description;
  product.image = req.file.location;
  product.isDeleted = false;
  product.save();
  res.redirect("/seller/products");
}

// Update an existing product
static async updateProduct(req, res, next) {
  try {
    const result = await Product.findByIdAndUpdate(
      { _id: req.body.id },
      {
        owner: req.decoded.user._id,
        category: req.body.categoryId,
        title: req.body.title,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        image: req.file.location,
        isDeleted: req.body.isDeleted,
      }
    );

    res.redirect("/seller/products");
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
}

// Test function to add fake products
static async hoaxerTest(req, res, next) {
  try {
    for (let i = 0; i < 15; i++) {
      let product = new Product();
      product.category = "5acc1902580ba509c6622bd7";
      product.owner = "5acbfed6571913c9a9e98135";
      product.image = hoaxer.image.cats();
      product.title = hoaxer.commerce.productName();
      product.description = hoaxer.lorem.words();
      product.price = hoaxer.commerce.price();
      await product.save();
    }

    res.redirect("/seller/products");
  } catch (error) {
    next(error);
  }
}

}

module.exports = SellerController;