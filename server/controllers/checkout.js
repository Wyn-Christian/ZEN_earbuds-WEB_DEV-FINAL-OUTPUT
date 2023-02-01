const Checkout = require("../models/checkout");
const CheckoutItem = require("../models/checkoutitem");
const Cart = require("../models/cart");

exports.list = (req, res, next) => {
  Checkout.find()
    .populate({
      path: "checkout_items",
      populate: {
        path: "product",
        model: "Product",
        select: "id name price",
      },
    })
    .exec((err, result) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(result);
    });
};

exports.create = (req, res, next) => {
  let { checkout_items, summary } = req.body;

  const new_checkout = new Checkout({
    checkout_items,
    total_products: summary.total_products,
    total_price: summary.total_price,
    total_quantity: summary.total_quantity,
  });

  new_checkout.save(async (err) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    await CheckoutItem.insertMany(checkout_items);
    await Cart.deleteMany({});

    res.json(new_checkout);
    return;
  });
};
