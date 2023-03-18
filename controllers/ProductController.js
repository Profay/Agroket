const Product = require("../models/product");
const async = require("async");


class ProductController {
    static async getProducts(req, res, next) {
        try {
          const perPage = 10;
          const page = req.query.page;
      
          const countPromise = Product.count({}).exec();
          const productsPromise = Product.find({
              isDeleted: false
            })
            .skip(perPage * page)
            .limit(perPage)
            .populate("category")
            .populate("owner")
            .exec();
      
          const [totalProducts, products] = await Promise.all([
            countPromise,
            productsPromise,
          ]);
      
          res.json({
            success: true,
            message: "Product",
            products: products,
            totalProducts: totalProducts,
            pages: Math.ceil(totalProducts / perPage),
            currentProducts: products.length,
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
        }
      }
      
    static async getCategory(req, res, next) {
        try {
            const categories = await Category.find({});
            res.json({
              success: true,
              message: "Success",
              categories: categories,
            });
          } catch (err) {
            console.error(err);
            res.status(500).json({
              success: false,
              message: "Internal Server Error",
            });
          }
    }

    static async newCategory(req, res, next) {
        const category = new Category();
        category.name = req.body.category;
        category.save();
        res.json({
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

        res.json({
            success: true,
            message: "category",
            products: products,
            categoryName: category.name,
            totalProducts: totalProducts,
            pages: Math.ceil(totalProducts / perPage),
        });
        } catch (err) {
        console.error(err);
        res.status(500).json({
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

    static async getProductsById(req, res, next) {
        try {
            const product = await Product.findById(req.params.id)
              .populate("category")
              .populate("owner")
              .deepPopulate("reviews.owner")
              .exec();
          
            if (!product) {
              return res.json({
                success: false,
                message: "Product is not found",
              });
            }
          
            res.json({
              success: true,
              product: product,
            });
          } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
          }          
    }




}
module.exports = ProductController;