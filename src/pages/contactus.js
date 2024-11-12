import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import bg4 from "../assect/images/4.png";
import Footer from "../components/footer";
import { contactFrom } from "../pages/services/api";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    comments: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, mobile, subject, comments } = formData;
    if (!name || !email || !mobile || !subject || !comments) {
      setError("All fields are required.");
      return;
    }
    console.log("Form Data:", formData); // Verify the data
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
 await contactFrom(formData);
      setSuccess("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        comments: "",
      });
    } catch (err) {
      setError("There was an error sending your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <Navbar navClass="defaultscroll sticky" logolight={true} menuClass="navigation-menu nav-left nav-light" />
      <section className="bg-half-170 d-table w-100" style={{ backgroundImage: `url(${bg4})` }}>
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <p className="text-white-50 para-desc mx-auto mb-0">Get in touch !</p>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Contact us</h5>
              </div>
            </div>
          </div>
          <div className="position-middle-bottom">
            <nav aria-label="breadcrumb" className="d-block">
              <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                <li className="breadcrumb-item"><Link to="/">GAMTLLP</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Contact us</li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
      <section className="section pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="p-4 rounded-3 shadow">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Your Name <span className="text-danger">*</span></label>
                        <input
                          name="name"
                          id="name"
                          type="text"
                          className="form-control"
                          placeholder="Name :"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Your Mobile <span className="text-danger">*</span></label>
                        <input
                          name="mobile"
                          id="mobile"
                          type="number"
                          className="form-control"
                          placeholder="Mobile :"
                          value={formData.mobile}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Your Email <span className="text-danger">*</span></label>
                        <input
                          name="email"
                          id="email"
                          type="email"
                          className="form-control"
                          placeholder="Email :"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Subject</label>
                        <input
                          name="subject"
                          id="subject"
                          className="form-control"
                          placeholder="Subject :"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Comments <span className="text-danger">*</span></label>
                        <textarea
                          name="comments"
                          id="comments"
                          rows="4"
                          className="form-control"
                          placeholder="Message :"
                          value={formData.comments}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          type="submit"
                          id="submit"
                          name="send"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? "Sending..." : "Send Message"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {success && <div className="alert alert-success mt-3">{success}</div>}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
