const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  id: true,
};

const CartSchema = new Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Product",
    },
    price: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  opts
);

module.exports = mongoose.model("Cart", CartSchema);
