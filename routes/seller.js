const router = require("express").Router();
const SellerController = require("../controllers/SellerController");
const jwt = require("../middlewares/jwt");


const upload = require("../middlewares/upload");





router.post("/products/:id", SellerController.findProductById);
router.get("/products", jwt, SellerController.getProducts);
router.post("/products", [jwt, upload.single("product_picture")], SellerController.addProduct);
router.post("/editproducts", [jwt, upload.single("product_picture")], SellerController.updateProduct);
router.get("/hoaxer/test", SellerController.hoaxerTest);


module.exports = router;
