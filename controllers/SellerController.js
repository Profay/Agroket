const Product = require("../models/productModel");
const faker = require("faker");


class SellerController {
    static async postProduct(req, res) {
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

    static async getProducts(req, res) {
        try {
            const products = await Product.find({ owner: req.decoded.user._id })
              .populate("owner")
              .populate("category")
              .exec();
          
            res.json({
              success: true,
              message: "Products",
              products: products,
            });
          } catch (error) {
            console.error(error);
            res.status(500).send("Failed to get products.");
          }
          
    }

    static async addProduct(req, res) {
        console.log(upload);
        console.log(req.file);
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
        res.json({
        success: true,
        message: "Successfully Added the product",
        });
    }

    static async UpdateProduct(req, res) {
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
          
            res.json({
              success: true,
              message: "Successfully updated the product",
            });
          } catch (err) {
            res.json({
              success: false,
              message: err,
            });
          }          
    }

    static async fakerTest(req, res) {
        router.get("/faker/test", async (req, res, next) => {
            try {
              for (i = 0; i < 15; i++) {
                let product = new Product();
                product.category = "5acc1902580ba509c6622bd7";
                product.owner = "5acbfed6571913c9a9e98135";
                product.image = faker.image.cats();
                product.title = faker.commerce.productName();
                product.description = faker.lorem.words();
                product.price = faker.commerce.price();
                await product.save();
              }
          
              res.json({
                message: "Successfully added 15 pictures",
              });
            } catch (error) {
              next(error);
            }
          });          
    }


}



module.exports = SellerController;