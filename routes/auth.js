const router = express.Router();
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const jwt = require("../middlewares/jwt");
const OrderController = require("../controllers/OrderController");


router.post('/signUp', AuthController.signUp);
router.post('/login', AuthController.login);
router.get('/profile', jwt, UserController.getProfile);
router.post('/profile', jwt, UserController.updateProfile);
router.get('/address', jwt, UserController.getAddress);
router.post('/address', jwt, UserController.updateAddress);
router.get('/orders', jwt, OrderController.getOrder);
router.get('/orders/:id', jwt, OrderController.getOrderById);
router.get('/orders/:id/delete', OrderController.deleteOrder);
router.post('/orders', OrderController.postOrder);



module.exports = router