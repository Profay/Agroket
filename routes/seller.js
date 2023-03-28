const router = require("express").Router();
const SellerController = require("../controllers/SellerController");
const checkjwt = require("../middlewares/checkjwt");


const upload = require("../middlewares/upload");





router.post("/products/:id", SellerController.findProductById);
router.get("/products", checkjwt, SellerController.getProducts);
router.post("/products", [checkjwt, upload.single("product_picture")], SellerController.addProduct);
router.post("/editproducts", [checkjwt, upload.single("product_picture")], SellerController.updateProduct);
router.get("/hoaxer/test", SellerController.hoaxerTest);


module.exports = router;
