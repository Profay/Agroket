const router = require("express").Router();
const SellerController = require("../controllers/SellerController");
const jwt = require("../middlewares/jwt");


const upload = require("../middlewares/upload");





router.post("/products/:id", SellerController.findProductById);
router.get("/products", jwt, SellerController.getProduct);
router.post("/products", [jwt, upload.single("product_picture")], SellerController.addProduct);
router.post("/editproducts", [jwt, upload.single("product_picture")], SellerController.updateProduct);
router.get("/faker/test", SellerController.fakerTest);


module.exports = router;
