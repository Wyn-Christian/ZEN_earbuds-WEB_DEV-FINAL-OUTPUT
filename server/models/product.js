const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  id: true,
};

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    category: {
      type: String,
      require: true,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    img_name: {
      type: String,
      trim: true,
    },
  },
  opts
);

ProductSchema.virtual("img_url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/images/products/${this.img_name}`;
});

module.exports = mongoose.model("Product", ProductSchema);
