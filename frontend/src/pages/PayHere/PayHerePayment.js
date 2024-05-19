/* global payhere */
import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';

const PayHerePayment = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { course, image, id, price } = location.state || {};

    useEffect(() => {
        document.body.style.backgroundColor = 'rgb(21, 34, 73)'; // Set the background color when the component mounts

        return () => {
            document.body.style.backgroundColor = null; // Revert the background color when the component unmounts
        };
    }, []);


    const handlePayment = async () => {
        // Replace with your credentials and order details
        const merchantId = "1226704";
        const orderId = `ORDER_${Date.now()}`;
        const amount = price;
        const currency = "LKR";
        const merchantSecret = "MTI3MTEyMTYzOTEwMzcwODMxNDQxMjQzMDQ4NzUxOTcyOTE4ODUz";

        // Request the hash from the backend
        const response = await axios.post("http://localhost:5000/generate-hash", {
            merchant_id: merchantId,
            order_id: orderId,
            amount,
            currency,
            merchant_secret: merchantSecret
        });

        const hash = response.data.hash;

        // Setup the payment data with the received hash
        const payment = {
            sandbox: true,
            merchant_id: merchantId,
            return_url: "http://localhost:3000/",
            cancel_url: "http://localhost:3000/",
            notify_url: "https://yourwebsite.com/notify",
            order_id: orderId,
            items: course,
            amount,
            currency,
            hash,
            first_name: "John",
            last_name: "Doe",
            email: "johndoe@gmail.com",
            phone: "0771234567",
            address: "123, Main Street",
            city: "Colombo",
            country: "Sri Lanka"
        };
        payhere.onCompleted = function (orderId) {
            console.log("Payment completed. OrderID:" + orderId);
            alert('done')
            navigate('/content', { state: { course: course, image: image, id: id } });
        };

        payhere.startPayment(payment);
        // if (payHereLoaded) {
        //     payhere.startPayment(payment);
        // } else {
        //     console.error('Attempted to trigger payment before PayHere was loaded.');
        // }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="card" style={{ width: "25rem" , borderRadius:'10px'}}>
                <img src={image} className="card-img-top" alt="Course Image" style={{borderRadius:'10px'}} />
                <div className="card-body">
                    <h2 className="card-title" style={{ textAlign: 'center' }}>{course}</h2>
                    <button type="button" className="btn btn-primary" style={{ display: 'block', margin: 'auto' }} onClick={handlePayment}>
                        Pay with PayHere
                    </button>
                </div>
            </div>
        </div>

    );
};

export default PayHerePayment;
