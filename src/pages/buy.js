import React, { useEffect, useState } from "react";
import bg2 from "../assect/images/5.png";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { FiCamera, FiHeart, FiHome } from "react-icons/fi";
import { useSelector } from "react-redux";
import { deleteProductById, fetchBookingDataUserId } from "./services/api";
import { toast } from "react-toastify";

const IMAGE_BASE_URL = "http://localhost:8080/";

export default function Buy() {
  const [selectedProduct, setSelectedProduct] = useState([]);
  console.log(selectedProduct);
  const { userId } = useSelector((state) => state.auth.user);
  const fetchProduct = async () => {
    try {
      const response = await fetchBookingDataUserId(userId);
      console.log(response);
      setSelectedProduct(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [userId]);
  const deleteProduct = async (productId) => {
    try {
      // Delete the product from the backend
      await deleteProductById(productId);
  
      // Update local state immediately using the correct _id field
      setSelectedProduct((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
  
      // Fetch updated data
      await fetchProduct();
      
      toast.success("Product removed successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
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
        style={{ backgroundImage: `url(${bg2})` }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <p className="text-white-50 para-desc mx-auto mb-0">
                  Buy Products
                </p>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  Find Your Products
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mt-100">
        {selectedProduct.length > 0 ? (
          <div className="row">
            {selectedProduct.map((product) => (
              <div className="col-lg-4 col-md-6 col-12 mb-4" key={product._id}>
                <div className="card property border-0 shadow position-relative overflow-hidden rounded-3">
                  <div className="property-image position-relative overflow-hidden shadow">
                    <img
                      src={`${IMAGE_BASE_URL}${product.image}`}
                      className="img-fluid"
                      alt={product.title}
                      style={{ height: "356px", width: "356px" }}
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
                    <ul className="list-unstyled mt-3">
                      <li className="list-inline-item mb-0">
                        <span className="text-muted">90Day Income</span>
                        <p className="fw-medium mb-0">
                          {product.ninetyDayIncome}
                        </p>
                      </li>
                      <li className="list-inline-item mb-0">
                        <span className="text-muted">365Day Income</span>
                        <p className="fw-medium mb-0">
                          {product.threeSixtyFiveDayIncome}
                        </p>
                      </li>
                      <li className="list-inline-item mb-0">
                        <span className="text-muted">Total Income</span>
                        <p className="fw-medium mb-0">{product.totalIncome}</p>
                      </li>
                    </ul>
                    <div className="d-flex justify-content-center gap-3 ">
                      <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-primary">Checkout</button>
                      </div>
                      <div className="d-flex justify-content-center mt-4">
                        <button
                          onClick={() => deleteProduct(product.productId)}
                          className="btn btn-danger"
                        >
                          Removed
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
      <Footer />
    </>
  );
}
