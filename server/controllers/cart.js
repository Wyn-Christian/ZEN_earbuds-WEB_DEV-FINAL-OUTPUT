const Cart = require("../models/cart");

exports.list = (req, res, next) => {
  Cart.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: { path: "$product" } },
    {
      $set: {
        total_price: { $multiply: ["$price", "$quantity"] },
      },
    },
  ]).exec((err, carts) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(carts);
  });
};

exports.create = async (req, res, next) => {
  let { product, quantity, price } = req.body;
  const new_cart = new Cart({
    product,
    quantity,
    price,
  });
  new_cart.save((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(new_cart);
    return;
  });
};

// add-to-cart
exports.add_to_cart = async (req, res, next) => {
  let cartItem = await Cart.find({ product: req.params.product_id });
  if (cartItem.length) {
    res.json({ error: "Cart Already Exist" });
    return;
  }
  const new_cart = new Cart({
    product: req.params.product_id,
    price: req.body.price,
  });

  new_cart.save((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    res.json(new_cart);
    return;
  });
};

// remove-from-cart
exports.remove_from_cart = (req, res, next) => {
  Cart.findByIdAndDelete(req.params.id).exec((err, result) => {
    if (err) return next(result);

    // success
    res.json({ status: "Deletion Success" });
  });
};

// update-quantity-cart
exports.update_quantity = (req, res, next) => {
  Cart.findByIdAndUpdate(
    req.params.id,
    {
      quantity: req.body.quantity,
    },
    { new: true }
  ).exec((err, result) => {
    if (err) return next(err);

    res.json({ status: "Update quantity success!", result });
  });
};

exports.summary = (req, res, next) => {
  Cart.aggregate([
    {
      $group: {
        _id: null,
        total_products: { $sum: 1 },
        total_price: { $sum: { $multiply: ["$price", "$quantity"] } },
        total_quantity: { $sum: "$quantity" },
      },
    },
  ]).exec((err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(result[0]);
  });
};
