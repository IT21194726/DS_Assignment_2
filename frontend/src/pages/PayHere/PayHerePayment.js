// /* global payhere */
// import React from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from 'react-router-dom';

// const PayHerePayment = () => {

//     const location = useLocation();
//     const navigate = useNavigate();
  
//     const { course, image, id, price } = location.state || {};


//     const handlePayment = async () => {
//         // Replace with your credentials and order details
//         const merchantId = "1226704";
//         const orderId = "ORDER_12345";
//         const amount = "3999.00";
//         const currency = "LKR";
//         const merchantSecret = "MTI3MTEyMTYzOTEwMzcwODMxNDQxMjQzMDQ4NzUxOTcyOTE4ODUz";

//         // Request the hash from the backend
//         const response = await axios.post("http://localhost:5000/generate-hash", {
//             merchant_id: merchantId,
//             order_id: orderId,
//             amount,
//             currency,
//             merchant_secret: merchantSecret
//         });

//         const hash = response.data.hash;

//         // Setup the payment data with the received hash
//         const payment = {
//             sandbox: true,
//             merchant_id: merchantId,
//             return_url: "http://localhost:3000/",
//             cancel_url: "http://localhost:3000/",
//             notify_url: "https://yourwebsite.com/notify",
//             order_id: orderId,
//             items: "Python Programming",
//             amount,
//             currency,
//             hash,
//             first_name: "John",
//             last_name: "Doe",
//             email: "johndoe@gmail.com",
//             phone: "0771234567",
//             address: "123, Main Street",
//             city: "Colombo",
//             country: "Sri Lanka"
//         };
//         payhere.onCompleted = function (orderId) {
//           console.log("Payment completed. OrderID:" + orderId);
//           navigate('/content', { state: { course: course, image: image, id: id } });
//         };


//         if (payHereLoaded) {
//             payhere.startPayment(payment);
//         } else {
//             console.error('Attempted to trigger payment before PayHere was loaded.');
//         }
//     };

//     return (
//         <div style={{ backgroundColor: 'lightblue', display: 'flex', justifyContent: 'center' }}>
//             <h1>PAY NOW</h1>
//             <button onClick={handlePayment}>Pay with PayHere</button>
//         </div>
//     );
// };

// export default PayHerePayment;
