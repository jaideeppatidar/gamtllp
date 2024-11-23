import React, { useEffect, useState } from "react";
import bg2 from "../assect/images/5.png";

import { Link } from "react-router-dom";
import { FiCamera, FiHeart, FiHome } from "react-icons/fi";
import { useSelector } from "react-redux";
import { fetchBookingDataUserId } from "./services/api"; // No need to import delete API
import { toast } from "react-toastify";

const IMAGE_BASE_URL = "https://api.gamtllp.com/";

const MyProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [softDeletedProducts, setSoftDeletedProducts] = useState([]); // State for soft-deleted products

  const { userId } = useSelector((state) => state.auth.user);

  const fetchProduct = async () => {
    try {
      const response = await fetchBookingDataUserId(userId);
      setSelectedProduct(Array.isArray(response.bookings) ? response.bookings : []);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [userId]);

  // Load soft-deleted products from localStorage when component mounts
  useEffect(() => {
    const deletedProducts = JSON.parse(localStorage.getItem("softDeletedProducts")) || [];
    setSoftDeletedProducts(deletedProducts);
  }, []);

  // Save soft-deleted products to localStorage when updated
  useEffect(() => {
    if (softDeletedProducts.length > 0) {
      localStorage.setItem("softDeletedProducts", JSON.stringify(softDeletedProducts));
    }
  }, [softDeletedProducts]);

  const softDeleteProduct = (productId) => {
    setSoftDeletedProducts((prev) => [...prev, productId]); // Add product ID to soft-deleted list
    toast.info("Product removed from view.");
  };

  return (
    <>
      <div>
        <section
          className="bg-half-170 d-table w-100"
          style={{ backgroundImage: `url(${bg2})` }}
        >
          <div className="bg-overlay bg-gradient-overlay-2"></div>
          <div className="container">
            <div className="row mt-5 justify-content-center">
              <div className="col-12">
                <div className="title-heading text-center">
                  <div className="d-flex justify-content-center gap-3">
                    <div>
                      <Link to="/">
                        <p className="text-white-50 para-desc mx-auto mb-0">Home</p>
                      </Link>
                    </div>
                    <span className="text-white">/</span>
                    <div>
                      <Link to="/">
                        <p className="text-white para-desc mx-auto mb-0">
                          MyProduct
                        </p>
                      </Link>
                    </div>
                  </div>
                  <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                    MyProduct
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container mt-100">
          {selectedProduct.length > 0 ? (
            <div className="row">
              {selectedProduct
                .filter((product) => !softDeletedProducts.includes(product._id)) // Exclude soft-deleted products
                .map((product) => (
                  <div className="col-lg-4 col-md-6 col-12 mb-4" key={product._id}>
                    <div className="card property border-0 shadow position-relative overflow-hidden rounded-3">
                      <div className="property-image position-relative overflow-hidden shadow">
                        <img
                          src={`${IMAGE_BASE_URL}${product.image}`}
                          className="img-fluid"
                          alt={product.title}
                          style={{ height: "270px", width: "356px" }}
                        />
                        <ul className="list-unstyled property-icon">
                          <li>
                            <Link
                              to="#"
                              className="btn btn-sm btn-icon btn-pills btn-primary"
                            >
                              <FiHome className="icons" />
                            </Link>
                          </li>
                          <li className="mt-1">
                            <Link
                              to="#"
                              className="btn btn-sm btn-icon btn-pills btn-primary"
                            >
                              <FiHeart className="icons" />
                            </Link>
                          </li>
                          <li className="mt-1">
                            <Link
                              to="#"
                              className="btn btn-sm btn-icon btn-pills btn-primary"
                            >
                              <FiCamera className="icons" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content p-4">
                        <h5 className="title fs-5 text-dark fw-medium">
                          {product.title}
                        </h5>
                        <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                          <li className="list-inline-item mb-0">
                            <span className="text-muted">Income</span>
                            <p className="fw-medium mb-0">{product.income}</p>
                          </li>
                          <li className="list-inline-item mb-0">
                            <span className="text-muted">Daily Income</span>
                            <p className="fw-medium mb-0">{product.dailyIncome}</p>
                          </li>
                          <li className="list-inline-item mb-0">
                            <span className="text-muted">Percentage</span>
                            <p className="fw-medium mb-0">{product.Persantage}</p>
                          </li>
                        </ul>

                        <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                          <li className="list-inline-item mb-0">
                            <span className="text-muted">Total Monthly</span>
                            <p className="fw-medium mb-0">{product.totalIncome}</p>
                          </li>
                          <li className="list-inline-item mb-0">
                        <span className="text-muted">Total Month Plan</span>
                        <p className="fw-medium mb-0">{product.Months} Month</p>
                      </li>
                        </ul>
                        <div className="d-flex justify-content-center gap-3">
                          <div className="d-flex justify-content-center mt-4">
                            <Link to="/bank-details" className="btn btn-primary">
                              Checkout
                            </Link>
                          </div>
                          <div className="d-flex justify-content-center mt-4">
                            <button
                              onClick={() => softDeleteProduct(product._id)}
                              className="btn btn-danger"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p>No products available. Please check back later.</p>
          )}
        </div>
    
      </div>
    </>
  );
};

export default MyProduct;
