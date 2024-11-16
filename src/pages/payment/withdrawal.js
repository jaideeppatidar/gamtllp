import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import bg3 from "../../assect/images/3.png";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import { Withdrawal, fetchBookingDataUserId } from "../services/api";
import { useSelector } from "react-redux";
import { toast ,ToastContainer} from "react-toastify";

const WithdrawalForm = () => {
  const { userId, firstName } = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: firstName,
    userId: userId,
    bankName: "",
    branchName: "",
    accountNumber: "",
    ifscCode: "",
    withdrawalMoney: "",
    productName:''
  });
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const response = await fetchBookingDataUserId(userId);
        console.log(response);
        
        // Extract product names from the response
        const products = response.bookings || [];
        const title = products.map((product) => product.title);  // Assuming 'productName' is the field holding the name
        setPurchasedProducts(title);
      } catch (error) {
        console.error("Error fetching purchased products:", error);
      }
    };

    fetchPurchasedProducts();
  }, [userId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
        const response = await Withdrawal(formData);
            toast.success(response.message);
            setFormData({
                name: "",
                userId: "",
                bankName: "",
                branchName: "",
                accountNumber: "",
                ifscCode: "",
                withdrawalMoney: "",
                productName: "",
            });
       
    } catch (err) {
        setError("Failed to submit withdrawal request. Please try again.");
    } finally {
        setLoading(false);
    }
};


  return (
    <>
      <Navbar
        navClass="defaultscroll sticky"
        logolight={true}
        menuClass="navigation-menu nav-left nav-light"
      />
      <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: `url(${bg3})` }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <div className="d-flex justify-content-center gap-3">
                  <div>
                    <Link to="/">
                      <p className="text-white-50 para-desc mx-auto mb-0">
                        Home
                      </p>
                    </Link>
                  </div>
                  <span className="text-white">/</span>
                  <div>
                    <Link to="/aboutus">
                      <p className="text-white para-desc mx-auto mb-0">
                        Withdrawal
                      </p>
                    </Link>
                  </div>
                </div>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white">
                  Withdrawal Form
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-5 mb-5">
        <h2>Withdrawal Form</h2>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Row 1: Name and User ID */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="userId">User ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 2: Bank Name and Branch Name */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="bankName">Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="branchName">Branch Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="branchName"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 3: Account Number and IFSC Code */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="accountNumber">Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="ifscCode">IFSC Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="ifscCode"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 4: Withdrawal Money */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="withdrawalMoney">Withdrawal Money</label>
                <input
                  type="number"
                  className="form-control"
                  id="withdrawalMoney"
                  name="withdrawalMoney"
                  value={formData.withdrawalMoney}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="productName">Product Name</label>
                  <select
                    id="productName"
                    name="productName"
                    className="form-control"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a product</option>
                    {purchasedProducts.map((product, index) => (
                      <option key={index} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
          </div>
          

          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer/>
      <Footer />
    </>
  );
};

export default WithdrawalForm;
