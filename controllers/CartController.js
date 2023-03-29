const Cart = require('../models/cartModel')
const Product = require('../models/productModel')

class CartController {
    static async addItem(req, res, next) {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});

        try {
            const product = await Product.findById(productId);
            cart.add(product, product.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/cart');
          } catch (err) {
            res.redirect('/products');
          }
    }

    static async reduceItem(req, res, next) {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.reduceByOne(productId);
        req.session.cart = cart;
        res.redirect('/cart');
    }

    static async removeItem(req, res, next) {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.removeItem(productId);
        req.session.cart = cart;
        res.redirect('/cart');
    }

    static async getCart(req, res, next) {
        if(!req.session.cart) {
            return res.render('cart', {products: null});
        }
        const cart = new Cart(req.session.cart);
        return res.render('cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
    }
}


module.exports = CartController