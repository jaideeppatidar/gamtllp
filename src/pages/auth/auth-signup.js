import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupValidationSchema } from "../../utils/validationSchema";
import bg3 from "../../assect/images/3.png";
import logo from "../../assect/images/logo.png";
import { registerUser } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    aadharCard: null,
    panCard: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const validateForm = async () => {
    try {
      await signupValidationSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (validationErrors) {
      const formErrors = {};
      validationErrors.inner.forEach((error) => {
        formErrors[error.path] = error.message;
      });
      setErrors(formErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("address", formData.address);
    if (formData.aadharCard)
      formDataToSend.append("aadharCard", formData.aadharCard);
    if (formData.panCard) formDataToSend.append("panCard", formData.panCard);
    try {
      await registerUser(formDataToSend);
      navigate("/auth-login");

      toast.success("Signup successful!");
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <section className="bg-home zoom-image d-flex align-items-center">
        <div
          className="bg-overlay image-wrap"
          style={{
            backgroundImage: `url(${bg3})`,
            backgroundPosition: "center",
          }}
        ></div>
        <div className="bg-overlay bg-gradient-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="p-4 bg-white rounded-3 shadow-md mx-auto w-100">
                <form onSubmit={handleSubmit}>
                  <Link to="/">
                    <img
                      src={logo}
                      className="mb-4 d-block mx-auto"
                      alt="logo"
                      style={{width:'70px'}}
                    />
                  </Link>
                  <h5 className="mb-3">Register your account</h5>

                  <div className="row">
                    <div className="form-floating col-md-6 mb-2">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.firstName ? "is-invalid" : ""
                        }`}
                        id="floatingInput"
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleChange}
                        value={formData.firstName}
                      />
                      <label htmlFor="floatingInput">First Name</label>
                      {errors.firstName && (
                        <div className="invalid-feedback">
                          {errors.firstName}
                        </div>
                      )}
                    </div>

                    <div className="form-floating col-md-6 mb-2">
                      <input
                        type="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        id="floatingEmail"
                        placeholder="name@example.com"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                      />
                      <label htmlFor="floatingEmail">Email Address</label>
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="form-floating col-md-6 mb-3">
                      <input
                        type="password"
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        id="floatingPassword"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                      />
                      <label htmlFor="floatingPassword">Password</label>
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>

                    <div className="form-floating col-md-6 mb-2">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.mobile ? "is-invalid" : ""
                        }`}
                        id="floatingMobile"
                        placeholder="Mobile Number"
                        name="mobile"
                        onChange={handleChange}
                        value={formData.mobile}
                      />
                      <label htmlFor="floatingMobile">Mobile Number</label>
                      {errors.mobile && (
                        <div className="invalid-feedback">{errors.mobile}</div>
                      )}
                    </div>

                    <div className="form-floating col-md-6 mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.address ? "is-invalid" : ""
                        }`}
                        id="floatingAddress"
                        placeholder="Address"
                        name="address"
                        onChange={handleChange}
                        value={formData.address}
                      />
                      <label htmlFor="floatingAddress">Address</label>
                      {errors.address && (
                        <div className="invalid-feedback">{errors.address}</div>
                      )}
                    </div>

                    <div className="mb-3 col-md-6">
                      <label htmlFor="aadharCard" className="form-label">
                        Upload Aadhaar Card
                      </label>
                      <input
                        type="file"
                        className={`form-control ${
                          errors.aadharCard ? "is-invalid" : ""
                        }`}
                        id="aadharCard"
                        name="aadharCard"
                        onChange={handleFileChange}
                      />
                      {errors.aadharCard && (
                        <div className="invalid-feedback">
                          {errors.aadharCard}
                        </div>
                      )}
                    </div>

                    <div className="mb-3 col-md-6">
                      <label htmlFor="panCard" className="form-label">
                        Upload PAN Card
                      </label>
                      <input
                        type="file"
                        className={`form-control ${
                          errors.panCard ? "is-invalid" : ""
                        }`}
                        id="panCard"
                        name="panCard"
                        onChange={handleFileChange}
                      />
                      {errors.panCard && (
                        <div className="invalid-feedback">{errors.panCard}</div>
                      )}
                    </div>
                  </div>

                  <div className="d-grid">
                    <button className="btn btn-primary" type="submit">
                      Register
                    </button>
                  </div>
                  <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted me-2">Don't have an account ?</span> <Link to="/auth-signup" className="text-dark fw-medium">Sign Up</Link></span>
                                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}
