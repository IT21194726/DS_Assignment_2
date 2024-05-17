// const crypto = require('crypto');

// const merchant_id = "1226704";
// const order_id = "ORDER_15";
// const payhere_amount = "99.00";
// const payhere_currency = "LKR";
// const status_code = "2";
// const merchant_secret = "MTI3MTEyMTYzOTEwMzcwODMxNDQxMjQzMDQ4NzUxOTcyOTE4ODUz";

// const secretHash = crypto.createHash("md5").update(merchant_secret).digest("hex").toUpperCase();
// const rawHash = merchant_id + order_id + payhere_amount + payhere_currency + status_code + secretHash;
// const md5sig = crypto.createHash("md5").update(rawHash).digest("hex").toUpperCase();

// console.log('MD5 Signature:', md5sig);
