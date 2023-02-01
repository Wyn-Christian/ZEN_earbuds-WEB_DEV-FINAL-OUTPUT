const User = require("../models/user");

exports.list = (req, res, next) => {
  User.find().exec((err, list_users) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(list_users);
  });
};
exports.detail = (req, res, next) => {
  User.findById(req.params.id).exec((err, list_users) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(list_users);
  });
};

exports.login = (req, res, next) => {
  User.find({
    email: req.body.email,
    password: req.body.password,
  }).exec((err, user) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(user);
  });
};

exports.create = async (req, res, next) => {
  let { username, email, password } = req.body;
  let isUserExist = await User.findOne({ $or: [{ username }, { email }] });
  if (isUserExist !== {}) {
    res.json({ status: "inputs are valid" });
  } else {
    res.json({ status: "gagi nag eexist na kupal ka talaga haiz " });
  }
};

exports.update = (req, res, next) => {
  let { username, email, password } = req.body;
  const user = {
    username,
    email,
    password,
  };

  User.findByIdAndUpdate(
    req.params.id,
    user,
    { new: true },
    (err, updated_user) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(updated_user);
      return;
    }
  );
};

exports.check_user = (req, res, next) => {
  User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  }).exec((err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(result);
  });
};

exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id).exec((err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(result);
  });
};
