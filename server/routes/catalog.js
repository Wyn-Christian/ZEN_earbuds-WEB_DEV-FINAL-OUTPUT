var express = require("express");
var router = express.Router();

const product_controller = require("../controllers/product");
const cart_controller = require("../controllers/cart");
const checkout_controller = require("../controllers/checkout");

router.get("/", (req, res, next) => {
  res.json({ message: "This is the index of your catalog" });
});

/// PRODUCT ROUTES ///
router.post("/products/create-many", product_controller.create_many);
router.get("/product/:id", product_controller.detail);
router.get("/products", product_controller.list);

/// CART ROUTES ///
router.post("/cart/add/:product_id", cart_controller.add_to_cart);
router.post("/cart/remove/:id", cart_controller.remove_from_cart);
router.post("/cart/update-quantity/:id", cart_controller.update_quantity);
router.get("/carts/summary", cart_controller.summary);
router.get("/carts", cart_controller.list);

/// CHECKOUT ROUTES ///
router.post("/checkout/create", checkout_controller.create);
router.get("/checkouts", checkout_controller.list);

module.exports = router;
