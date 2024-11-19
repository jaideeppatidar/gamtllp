import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import bg3 from "../../assect/images/2.png";
import Profile from "../../assect/images/gamtllp.png";

import { useSelector } from "react-redux";
import { fetchBookingDataUserId } from "../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const { userId, firstName,referralLink } = useSelector((state) => state.auth.user);
  
  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const response = await fetchBookingDataUserId(userId);
        console.log(response);
        setPurchasedProducts(Array.isArray(response.bookings) ? response.bookings : [response] || []);
      } catch (error) {
        console.error("Error fetching purchased products:", error);
      }
    };
    fetchPurchasedProducts();
  }, [userId]);
  const totalIncome = purchasedProducts.reduce(
    (sum, product) => sum + (product.income || 0),
    0
  );
  
  

  return (
    <>
     
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
                    <Link to="/aboutus">
                      <p className="text-white para-desc mx-auto mb-0">
                        User Account
                      </p>
                    </Link>
                  </div>
                </div>

                <h5 className="heading fw-semibold mb-0 sub-heading text-white">
                  Your Purchased Products
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container p-4" style={{ background: "green", marginTop: "50px" }}>
  <div className="row">
    <div className="col-md-4 text-center text-white mb-4 mb-md-0">
      <img
        src={Profile}
        alt="profile"
        className="rounded-circle mb-3"
        style={{ width: "120px", height: "120px" }}
      />
      <h4>{firstName}</h4>
      <p className="card-text text-white">
        <strong>Geet Agro Multitrade LLP Company</strong>
      </p>
      <div className="bg-white-500 p-4 rounded-lg shadow-lg max-w-sm">
  <p className="card-text text-white mb-2">
    <strong>Referral Link</strong>
  </p>
  <div className="flex items-center bg-gray-700 p-2 rounded-lg">
    <input
      type="text"
      value={referralLink}
      readOnly
      className="bg-transparent text-white flex-grow outline-none"
    />
    <button
      onClick={() => {
        navigator.clipboard.writeText(referralLink);
      }}
      className="btn btn-primary"
    >
      Copy
    </button>
  </div>
</div>

    </div>

    <div className="col-md-8">
      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <div className="card p-3">
            <h5 className="card-title">Trading Wallet</h5>
            <p className="card-text text-muted">
              {`Total Income: ${totalIncome}`}
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <div className="card p-3">
            <h5 className="card-title">Total Products</h5>
            <p className="card-text text-muted">
              {`Total Purchased Products: ${purchasedProducts.length}`}
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <div className="card p-3">
            <h5 className="card-title">Profit Wallet</h5>
            <p className="card-text text-muted">{`Total Balance: ${0}`}</p>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-2">
          <div className="card p-3">
            <h5 className="card-title">Withdrawal</h5>
            <p className="card-text text-muted">
              Click withdrawal button and get Money
            </p>
            <div className="d-flex justify-content-center gap-3 flex-column flex-md-row">
              <div className="d-flex justify-content-center">
                <Link to="/Withdrawal" className="btn btn-primary">
                  Pro withdraw
                </Link>
              </div>
              <div className="d-flex justify-content-center">
                <Link to="/tradingWithdrawal" className="btn btn-primary">
                  Tra withdraw
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


      <div className="container mt-2">
  <h4 className="text-left mb-4">Your Purchased Products</h4>
  {purchasedProducts.length === 0 ? (
    <p>No products purchased yet.</p>
  ) : (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Percentage</th>
            <th>Invest Income</th>
            <th>365 Day Income</th>
            <th>Booking Date</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {purchasedProducts.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={`http://localhost:8080/${product.image}`}
                  alt={product.title}
                  style={{ width: "50px", height: "auto" }}
                />
              </td>
              <td>{product.title}</td>
              <td>{product.Persantage}</td>
              <td>{product.income}</td>
              <td>{product.threeSixtyFiveDayIncome}</td>
              <td>{new Date(product.bookingDate).toLocaleDateString()}</td>
              <td
                className={
                  product.status?.toLowerCase().trim() === 'pending'
                    ? 'text-red-500'
                    : 'text-green-500'
                }
              >
                {product.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

    
    </>
  );
};

export default Dashboard;
