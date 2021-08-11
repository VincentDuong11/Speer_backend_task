/* TASK 2:

Build a stock market tracking system.

Section 1

> Your system should have support for users to login/logout.

> Users should be able to add balance to their wallet.

> Users should be able to buy/sell shares (transactions need not be stored)

> Users should be able to subscribe to an endpoint that should provide live rates.

> Users should have the ability to see their portfolio */

var express = require("express");
var router = express.Router();

var users = [
  {
    username: "chanh",
    password: "chanhduong123",
    balance: 0,
    shares: [],
  },
  {
    username: "admin",
    password: "Admin123!",
    balance: 0,
    shares: [],
  },
];
var sharePrice = {
  QQQ: 12,
  VUS: 50,
  VTI: 96,
  APPL: 65,
  SHOP: 16,
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Authentication by default username and password.
var auth = function (req, res, next) {
  if (req.session && req.session.username && req.session.password)
    return next();
  else return res.sendStatus(401);
};

//login page for authenticated user. if the input username and password match with system then successful login
router.post("/login", function (req, res) {
  if (!req.body.username || !req.body.password) {
    return res.sendStatus(401);
  }
  var user = findUserByUsername(req.body.username);
  if (!user) return res.sendStatus(401);
  if (user.password == req.body.password) {
    req.session.username = user.username;
    req.session.password = user.password;
    return res.sendStatus(200); //success
  }
  return res.sendStatus(401); //not found
});

//logout page
router.post("/logout", function (req, res) {
  req.session.destroy(); //kill the session
  return res.sendStatus(200);
});

//Adding balance page.
//The successful login user is allow to add balance.
router.post("/:username/balance/add", auth, (req, res) => {
  var user = findUserByUsername(req.params.username);
  if (!user || user.username != req.session.username) return res.status(400);
  user.balance += req.body.amount;
  return res.sendStatus(200);
});

//Balance view page.
//The successful login user is allow to view their balance.
router.get("/:username/balance", auth, (req, res) => {
  var user = findUserByUsername(req.params.username);
  if (!user || user.username != req.session.username) return res.status(400);
  return res.status(200).json(user.balance);
});

//Portfolio view page.
//The successful login user is allow to view their portfolio.
router.get("/:username/shares", auth, (req, res) => {
  var user = findUserByUsername(req.params.username);
  if (!user || user.username != req.session.username) return res.status(400);
  return res.status(200).json(user.shares);
});

//Trading page.
//The successful login user is allow to buy/sell their stocks.
router.post("/:username/shares/:action", auth, (req, res) => {
  var user = findUserByUsername(req.params.username);
  if (!user || user.username != req.session.username) return res.status(400);
  //check if the stock's code is valid to buy.
  if (!sharePrice[req.body.code]) {
    return res
      .status(400)
      .json({ message: "Stock is not available for purchase" });
  }
  if (user.shares[req.body.code] == null) user.shares[req.body.code] = 0;
  //check if the user's balance is enough to make the payment
  if (req.params.action == "buy") {
    if (user.balance - sharePrice[req.body.code] * req.body.amount < 0) {
      return res.status(400).json({
        message: "User balance is not enough to cover this transaction",
      });
    }
    user.balance -= sharePrice[req.body.code] * req.body.amount;
    user.shares[req.body.code] += req.body.amount;
    return res.sendStatus(200);
  } else if (req.params.action == "sell") {
    //check if the user has share to sell.
    if (user.shares[req.body.code] < req.body.amount) {
      return res
        .status(400)
        .json({ message: "User does not have sufficient shares to sell" });
    }
    user.shares[req.body.code] -= req.body.amount;
    user.balance += sharePrice[req.body.code] * req.body.amount;
    return res.sendStatus(200);
  }

  return res.status(400).json({ message: "Invalid action for user shares" });
});

//View live rate page.
//The successful login user is allow to view live rate.
router.get("/rates", (req, res) => {
  return res.status(200).json(sharePrice);
});

//search the user function.
function findUserByUsername(username) {
  for (var user of users) {
    if (user.username == username) return user;
  }
}

module.exports = router;
