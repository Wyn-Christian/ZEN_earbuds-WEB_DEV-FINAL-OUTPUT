const Product = require("../models/product");

exports.list = (req, res, next) => {
  Product.find().exec((err, products) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(products);
  });
};

exports.detail = (req, res, next) => {
  Product.findById(req.params.id).exec((err, product) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(product);
  });
};

exports.create = (req, res, next) => {
  let { name, category, description, subtitle } = req.body;
  const new_product = new Product({
    name,
    category,
    description,
    subtitle,
  });
  new_product.save((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(new_product);
    return;
  });
};

exports.create_many = (req, res, next) => {
  Product.insertMany(req.body).then((result) => console.log(result));
};

exports.update = (req, res, next) => {
  let { name, category, description, subtitle } = req.body;
  const product = {
    name,
    category,
    description,
    subtitle,
  };

  Product.findByIdAndUpdate(
    req.params.id,
    product,
    { new: true },
    (err, updated_product) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(updated_product);
      return;
    }
  );
};

exports.delete = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id).exec((err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.json(result);
  });
};
