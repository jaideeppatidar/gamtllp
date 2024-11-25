import React, { useState } from "react";
import whatsappImage from "../../assect/images/QR-Geet-Agro.png";
import whatsappIcon from "../../assect/images/whatsaap.png";
import { PaymentValidation } from "../../utils/validationSchema";
import { ToastContainer, toast } from "react-toastify";
import { AddPaymentDetails } from "../services/api";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import bg3 from "../../assect/images/3.png";
export default function BankDetails() {
  const [errors, setErrors] = useState({});
  const { userId, firstName } = useSelector((state) => state.auth.user);
  const location = useLocation();
  const { productName, income } = location.state || {};
  const [formData, setFormData] = useState({
    paymentscreensort: null,
    date: "",
    amount: income,
    userId:userId,
    firstName:firstName,
    // productName:productName
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, paymentscreensort: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PaymentValidation.validate(formData, { abortEarly: false });
      setErrors({});
      const formDataToSend = new FormData();
      formDataToSend.append("paymentscreensort", formData.paymentscreensort);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("amount", formData.amount);
      formDataToSend.append("firstName", formData.firstName);
      // formDataToSend.append("productName", formData.productName);

      formDataToSend.append("userId", formData.userId);
      const response = await AddPaymentDetails(formDataToSend); 
      toast.success(response.message);
      setFormData({
        paymentscreensort: "",
        date: "",
        amount: "",
      });
      } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        const errorMessage = err.response.data.error || "An unexpected error occurred";
        toast.error(errorMessage);
      } else if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        toast.error("Please fill in the required fields.");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>

  
    <div>
       <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: `url(${bg3})` }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <div className=" d-flex justify-content-center gap-3">
                  <div>
                    <Link to="/">
                      <p className="text-white-50 para-desc mx-auto mb-0">
                        Home
                      </p>
                    </Link>
                  </div>
                  <span className="text-white">/</span>
                  <div>
                    <Link to="/bank-details">
                      <p className="text-white para-desc mx-auto mb-0">
                       Payment
                      </p>
                    </Link>
                  </div>
                </div>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                PaymentDetails
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div className="container mt-5">
      <div className="row">
        {/* QR Scanner Section */}
        <div className="col-12 col-md-6 text-center mb-4">
          <div
            className="card p-4 shadow-sm rounded"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              maxWidth: "420px",
              width: "100%",
            }}
          >
            <div className="card-title mb-3">
              <strong>Geet Agro Multitrade LLP Company</strong>
            </div>
            <img
              src={whatsappImage}
              alt="Scanner"
              className="img-fluid"
              style={{
                width: "100%",
                height: "70vh",
                objectFit: "contain",
                maxHeight: "410px",
              }}
            />
            <p className="mt-3 text-muted">Scan for verification</p>
          </div>
        </div>

        {/* WhatsApp Section with Card Upload */}
        <div className="col-12 col-md-6">
          <div
            className="d-flex justify-content-center align-items-center rounded"
            style={{
              background: "linear-gradient(180deg, #25D366, #128C7E)",
              color: "white",
              height: "70vh",
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
                Read our Privacy Policy. Tap "Agree & Continue" to accept the Terms of Service.
              </p>
           
              <p className="text-muted mt-3" style={{ fontSize: "12px" }}>
                From Facebook
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className=" mb-5 mt-4">
      <form onSubmit={handleSubmit}>
                {/* Card Upload */}
                <div className="mb-3 text-start">
                  <label htmlFor="paymentscreensort" className="form-label">
                    Upload Card Image:
                  </label>
                  <input
                    type="file"
                    id="paymentscreensort"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                </div>
                {errors.paymentscreensort && (
            <p className="error-text">{errors.paymentscreensort}</p>
          )}

                {/* Date Input */}
                <div className="mb-3 text-start">
                  <label htmlFor="date" className="form-label">
                    Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.date && (
            <p className="error-text">{errors.date}</p>
          )}

                {/* Amount Input */}
                <div className="mb-3 text-start">
                  <label htmlFor="amount" className="form-label">
                    Amount:
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    className="form-control"
                    placeholder="Enter Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.amount && (
            <p className="error-text">{errors.amount}</p>
          )}
          {/* <div className="mb-3 text-start">
                  <label htmlFor="productName" className="form-label">
                    Amount:
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    className="form-control"
                    placeholder="Enter productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.productName && (
            <p className="error-text">{errors.productName}</p>
          )} */}

                <button
                  type="submit"
                  className="btn btn-success w-100 rounded-pill"
                  style={{ fontSize: "16px", padding: "10px" }}
                >
                  Submit
                </button>
              </form>
      </div>
      <ToastContainer/>
    </div>
    </>
  );
}
