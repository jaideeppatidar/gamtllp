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
  const { userId, firstName } = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const response = await fetchBookingDataUserId(userId);
        console.log(response);
        setPurchasedProducts(Array.isArray(response) ? response : [response]);
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

      <div class="container p-5" style={{ background: "#4A90E2",marginTop:'50px' }}>
        <div class="row">
          <div class="col-md-4 text-center text-white">
            <img
              src={Profile}
              alt="profile"
              class="rounded-circle mb-3"
              style={{ width: "120px", height: "120px" }}
            />
            <h4>{firstName}</h4>
            <p class="card-text text-white">
            <strong>Geet Agro Multitrade LLP Company</strong>

                  </p>
          </div>

          <div class="col-md-8">
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="card p-3" style={{ height: "130px" }}>
                  <h5 class="card-title">Invest Income</h5>
                  <p class="card-text text-muted">
                    {`Total Income: ${totalIncome}`}
                  </p>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="card p-3" style={{ height: "130px" }}>
                  <h5 class="card-title"> Total Products</h5>
                  <p class="card-text text-muted">
                    {`Total Purchased Products: ${purchasedProducts.length}`}
                  </p>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="card p-3" style={{ height: "130px" }}>
                  <h5 class="card-title">Motivations</h5>
                  <p class="card-text text-muted">
                    Ut enim ad minim veniam, quis nostrud exercitation.
                  </p>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="card p-3" style={{ height: "130px" }}>
                  <h5 class="card-title">Concerns</h5>
                  <p class="card-text text-muted">
                    Duis aute irure dolor in reprehenderit in voluptate.
                  </p>
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
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th> Invest Income</th>
                <th>365 Day Income</th>
                <th>Booking Date</th>
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
                  <td>{product.income}</td>
                  <td>{product.threeSixtyFiveDayIncome}</td>
                  <td>{new Date(product.bookingDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
