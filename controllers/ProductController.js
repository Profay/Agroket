const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const async = require("async");


class ProductController {
  static async getProducts(req, res, next) {
    try {
        const perPage = 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * perPage;

        const countPromise = Product.countDocuments({ isDeleted: false }).exec();
        const productsPromise = Product.find({})
            .skip(skip)
            .limit(perPage)
            .populate("category")
            .populate("owner")
            .exec();

        const [totalProducts, products] = await Promise.all([countPromise, productsPromise]);
        console.log(products)

        res.render("products.ejs", {
            success: true,
            message: "Product",
            products: products,
            totalProducts: totalProducts,
            pages: Math.ceil(totalProducts / perPage),
            currentPage: page,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

  
  static async getProductById(req, res, next) {
    try {
      const product = await Product.findById(req.params.id)
        .populate("category")
        .populate("owner")
        .deepPopulate("reviews.owner")
        .exec();
  
      if (!product) {
        return res.render("error.ejs", {
          success: false,
          message: "Product is not found",
        });
      }
  
      res.render("product.ejs", {
        success: true,
        product: product,
      });
    } catch (err) {
      console.error(err);
      res.status(500).render("error.ejs", {
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  
  static async updateProducts(req, res, next) {
    try {
      const result = await Product.findByIdAndUpdate(
        { _id: req.params.id },
        { quantity: req.body.qty },
        { new: true }
      ).exec();
  
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  
  
      
  static async getCategory(req, res, next) {
    try {
      const categories = await Category.find({});
        console.log(categories)
        res.render("categories", {
            success: true,
            message: "Success",
            categories: categories,
        });
    } catch (err) {
        console.error(err);
        res.status(500).render("error", {
            success: false,
            message: "Internal Server Error",
        });
    }
}

static async newCategory(req, res, next) {
    const category = new Category();
    category.name = req.body.category;
    category.save();
    res.render("categories", {
        success: true,
        message: "Successful",
    });
}

static async getCategoryById(req, res, next) {
    const perPage = 10;
    const page = req.query.page;

    try {
        const countPromise = Product.count({ category: req.params.id }).exec();
        const productsPromise = Product.find({ category: req.params.id })
            .skip(perPage * page)
            .limit(perPage)
            .populate("category")
            .populate("owner")
            .populate("reviews")
            .exec();
        const categoryPromise = Category.findOne({ _id: req.params.id }).exec();

        const [totalProducts, products, category] = await Promise.all([
            countPromise,
            productsPromise,
            categoryPromise,
        ]);

        res.render("category", {
            success: true,
            message: "category",
            products: products,
            categoryName: category.name,
            totalProducts: totalProducts,
            pages: Math.ceil(totalProducts / perPage),
        });
    } catch (err) {
        console.error(err);
        res.status(500).render("error", {
            success: false,
            message: "Internal Server Error",
        });
    }
}
}




module.exports = ProductController;