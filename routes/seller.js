const router = require("express").Router();
const SellerController = require("../controllers/SellerController");
const checkjwt = require("../middlewares/checkjwt");


const uploadFile = require("../middlewares/upload");





router.post("/products/:id", SellerController.findProductById);
router.get("/products", checkjwt, SellerController.getProducts);
router.post("/products", [checkjwt, uploadFile("product_picture")], SellerController.addProduct);
router.post("/editproducts", [checkjwt, uploadFile("product_picture")], SellerController.updateProduct);
router.get("/hoaxer/test", checkjwt, SellerController.hoaxerTest);


module.exports = router;
