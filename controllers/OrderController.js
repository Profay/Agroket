const Order = require('../models/orderModel')

class OrderController {
    static async getOrder(req, res, next) {
        Order.find({
            owner: req.decoded.user._id
          })
          .populate("products.product")
          .populate("owner")
          .exec((err, orders) => {
            if (err) {
              res.json({
                success: false,
                message: "Order cannot be found",
              });
            } else {
              res.json({
                success: true,
                message: "Order found",
                orders: orders,
              });
            }
          });
    };

    static async deleteOrder(req, res) {
        Order.remove({
            _id: req.params.id
          }, function (err, result) {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              console.log(result);
              res.send(result);
            }
          });
    }

    static async getOrderById(req, res, next) {
        Order.findOne({
            _id: req.params.id
          })
          .deepPopulate("products.product.owner")
          .populate("owner")
          .exec((err, order) => {
            if (err) {
              res.json({
                success: false,
                message: "Order cannot be found",
              });
            } else {
              res.json({
                success: true,
                message: "Order found",
                order: order,
              });
            }
          });
    };

}



module.exports = OrderController