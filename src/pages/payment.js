import React from "react";
import { Link } from "react-router-dom";
import whatsappImage from "../assect/images/QR-Geet-Agro.png";
import whatsappIcon from "../assect/images/whatsaap.png";
export default function BankDetails() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-6 text-center mb-4">
          <div
            className="card p-4 shadow-sm rounded"
            style={{ backgroundColor: "#fff", border: "1px solid #ddd", maxWidth: "420px",
            width: "100%", }} 
          >
            <div className="card-title mb-3">
              <strong>Geet Agro Multitrade LLP Company</strong>
            </div>
            <img
              src={whatsappImage}
              alt="Scanner"
              className="img-fluid"
              style={{
                height: "auto",
                width: "100%",
                height:'70vh',
                objectFit: "contain",
                maxHeight: "410px", 
              }}
            />
            <p className="mt-3 text-muted">Scan for verification</p>
          </div>
        </div>
        <div className="col-12 col-md-6">
        <div
      className="d-flex justify-content-center align-items-center rounded "
      style={{
        background: "linear-gradient(180deg, #25D366, #128C7E)",
        color: "white",
        height:'70vh',
        maxWidth: "420px",
        width: "100%",
      }}
    >
      <div
        className="text-center p-4 bg-white rounded shadow"
        style={{
          maxWidth: "350px",
          width: "100%",
        }}
      >
        <div className="mb-4">
          <img
            src={whatsappIcon} 
            alt="WhatsApp Logo"
            className="img-fluid"
            style={{ height: "80px", width: "80px" }}
          />
        </div>
        <h2 className="text-success fw-bold">Welcome to WhatsApp</h2>
        <p className="text-muted my-3" style={{ fontSize: "12px" }}>
          Read our Privacy Policy. Tap "Agree & Continue" to accept the Terms of Service
        </p>
        <Link
          to="https://wa.me/+917470513604"
         
          className="btn btn-success w-100 rounded-pill"
          style={{ fontSize: "16px", padding: "10px" }}
        >
          Agree & Continue
        </Link>
        <p className="text-muted mt-3" style={{ fontSize: "12px" }}>
          From Facebook
        </p>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}
