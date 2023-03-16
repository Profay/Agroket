const Order = require('../models/orderModel')
const config = require("../config");

class OrderController {
    static async getOrder(req, res, next) {
        try {
          const orders = await Order.find({ owner: req.decoded.user._id })
            .populate("products.product")
            .populate("owner");
      
          res.json({
            success: true,
            message: "Order found",
            orders: orders,
          });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: "Order cannot be found",
            error: err.message,
          });
        }
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
        try {
          const order = await Order.findOne({ _id: req.params.id })
            .deepPopulate("products.product.owner")
            .populate("owner")
            .exec();
          
          if (!order) {
            res.json({ success: false, message: "Order cannot be found" });
          } else {
            res.json({ success: true, message: "Order found", order: order });
          }
        } catch (err) {
          res.json({ success: false, message: "Error fetching order", error: err });
        }
      };
      

    static async postOrder(req, res) {

    }

}



module.exports = OrderController