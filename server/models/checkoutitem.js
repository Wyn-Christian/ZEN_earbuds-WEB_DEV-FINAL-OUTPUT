const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  id: true,
};

const CheckoutItemSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Product",
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    total_price: {
      type: Number,
    },
  },
  opts
);

module.exports = mongoose.model("CheckoutItem", CheckoutItemSchema);
