import React from "react";
import { Link, useNavigate } from "react-router-dom";
import whatsappImage from "../assect/images/QR.png";
import whatsappImages from "../assect/images/whatsaap.png";


export default function BankDetails() {
  const navigate = useNavigate();

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing logic
    alert("Payment processing...");
    navigate("/payment-success"); // Redirect to a success page
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left side scanner */}
        <div className="col-12 col-md-6 text-center mb-4">
          <img
            src={whatsappImage}
            alt="Scanner"
            className="img-fluid"
            style={{ height: "50%", width: "100%", objectFit: "contain" }} // Ensure it scales properly
          />
          <p className="mt-3">Scan for verification</p>
        </div>

        {/* Right side bank details form */}
        <div className="col-12 col-md-6">
        <div className="bank-details-form shadow p-4 rounded">
              <h4>Please Share Screenshot on Whatsapp </h4>
              <form onSubmit={handlePaymentSubmit}>
              {/* <img
            src={whatsappImages}
            alt="Scanner"
            className="img-fluid"
            style={{ height: "100px", width: "1oopx", objectFit: "contain" }} // Ensure it scales properly
          /> */}
                <Link
                  to={"https://wa.me/+917470513604"}
                  className="btn btn-primary w-100"
                >
                  Whatsapp
                </Link>
              </form>
            </div>
          
        </div>
      </div>
    </div>
  );
}
