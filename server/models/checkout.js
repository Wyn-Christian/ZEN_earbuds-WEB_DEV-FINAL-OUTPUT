const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const opts = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
};

const CheckoutSchema = new Schema(
  {
    checkout_items: [
      {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "CheckoutItem",
      },
    ],
    total_products: {
      type: Number,
      require: true,
    },
    total_price: {
      type: Number,
      require: true,
    },
    total_quantity: {
      type: Number,
      require: true,
    },
  },
  opts
);

CheckoutSchema.virtual("date").get(function () {
  return DateTime.fromJSDate(this.created_at).toFormat("MM-dd-yyyy");
});

module.exports = mongoose.model("Checkout", CheckoutSchema);
