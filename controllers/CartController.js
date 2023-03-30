const Cart = require('../models/cartModel')
const Product = require('../models/productModel')

class CartController {
    static async addItem(req, res, next) {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
      
        try {
          const product = await Product.findById(productId);
          console.log('Product:', product);
      
          cart.add(product, product.id);
          console.log('Cart:', cart);
      
          req.session.cart = cart;
          console.log('Session cart:', req.session.cart);
      
          res.redirect('/cart');
        } catch (err) {
          console.error(err);
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
        console.log('getCart method called');
        console.log(req.session.cart)
        if(!req.session.cart) {
          return res.render('cart', {products: []});
        }
      
        const cart = new Cart(req.session.cart);
        console.log('Cart items:', cart.generateArray());
        console.log('Cart total price:', cart.totalPrice);
      
        return res.render('cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
      }
         
      
}


module.exports = CartController