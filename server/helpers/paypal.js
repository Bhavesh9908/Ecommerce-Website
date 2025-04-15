const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AdM0xM5NsPpTlRTjxFULkLPnUwiz2pHTR0AHHVT9fB8TRi9-ZONYhK81e7qYeNtCzpE2zU1bVcsA6_jp",
  client_secret: "ENA6rWWb3F1uC-MXYjKmkOB7HVlyZ9kEvA_15AOpiilSGl93vG-vozOHqBlowO6YaEjzINSoPb3ssuJk",
});

module.exports = paypal;
