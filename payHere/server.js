// server.js
const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require('twilio');
const sgMail = require('@sendgrid/mail');

const app = express();

app.use(cors({
    origin: "http://localhost:3000" // Replace this with your client URL
  }));
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



function generatePayHereHash(merchant_id, order_id, amount, currency, merchant_secret) {
  const secretHash = crypto.createHash("md5").update(merchant_secret).digest("hex").toUpperCase();
  const rawHash = merchant_id + order_id + amount + currency + secretHash;
  return crypto.createHash("md5").update(rawHash).digest("hex").toUpperCase();
}



const accountSid = 'AC57e301b6dcede211cf087d3c98d379a0'; // Your Account SID from www.twilio.com/console
const authToken = '391160b39953a3d5c97fefc5db77a7cc';   // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

function sendSMS(to, message) {
  client.messages.create({
    body: message,
    to: to,  // Text this number
    from: '+12096998042' // From a valid Twilio number
  })
  .then((message) => console.log('message send successfully',message.sid))
  .catch((error) => console.error('Error sending SMS:', error));
}



// SendGrid API key
sgMail.setApiKey('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');

function sendEmail(to, subject, text) {
  const msg = {
    to: to, // Recipient email
    from: 'muhammedmufeel876@gmail.com', // Verified sender email
    subject: subject,
    text: text,
  };

  sgMail.send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
}



app.post("/generate-hash", (req, res) => {
  const { merchant_id, order_id, amount, currency, merchant_secret } = req.body;
  const hash = generatePayHereHash(merchant_id, order_id, amount, currency, merchant_secret);
  res.json({ hash });

  console.log('hash generated')
});





app.post("/notify", (req, res) => {
  console.log('notify clicked')
  console.log('Received notify:', req.body);
  const { merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig } = req.body;
  const merchant_secret = 'MTI3MTEyMTYzOTEwMzcwODMxNDQxMjQzMDQ4NzUxOTcyOTE4ODUz';

  
  
  const local_md5sig = crypto.createHash('md5')
    .update(merchant_id + order_id + payhere_amount + payhere_currency + status_code + crypto.createHash('md5').update(merchant_secret).digest('hex').toUpperCase())
    .digest('hex')
    .toUpperCase();

    console.log('Calculated local_md5sig:', local_md5sig);

  if (local_md5sig === md5sig && status_code == 2) {

    console.log('Payment successful, sending notifications');
    // Payment is successful, send confirmation notifications
    const phoneNumber = '+94757416964'; // Retrieve from your database
    const email = 'muhammedfazilmufeel@gmail.com'; // Retrieve from your database
    const message = 'Your enrollment is successful!';
    
    sendSMS(phoneNumber, message);
    sendEmail(email, 'Enrollment Confirmation', message);

    res.status(200).send('Notification sent');
  } else {
    console.log('Invalid signature or payment failed');
    res.status(400).send('Invalid signature or payment failed');
  }
});


app.listen(5000, () => console.log("Server running on port 5000"));
