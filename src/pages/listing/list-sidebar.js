import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg3 from "../../assect/images/bg/03.jpg";
import { FiHome, FiHeart, FiCamera } from "../../assect/icons/vander";
import { fetchProductData } from "../services/api";

const IMAGE_BASE_URL = "http://localhost:6060/";
export default function ListSidebar() {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
      const getProductData = async () => {
        try {
          const data = await fetchProductData();
          setProductData(data.meetings); 
        } catch (error) {
          console.error("Error setting product data:", error);
        }
      };
      
      getProductData();
    }, []);
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
                    <Link to="/">
                      <p className="text-white para-desc mx-auto mb-0">
                      Products
                      </p>
                    </Link>
                  </div>
                </div>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  Products
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mt-100 mt-60">
        <div className="row justify-content-center">
          <div className="col">
            <div className="section-title text-center mb-4 pb-2">
              <h4 className="title mb-3">View All Products</h4>
              <p className="text-muted para-desc mb-0 mx-auto">
                A great plateform to buy, sell and rent your properties without
                any agent or commisions.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-0">
          {productData.slice(0, 6).map((item, index) => (
            <div className="col-lg-4 col-md-6 col-12" key={index}>
              <div className="card property border-0 shadow position-relative overflow-hidden rounded-3">
                <div className="property-image position-relative overflow-hidden shadow">
                  <img
                    src={`${IMAGE_BASE_URL}${item.image}`}
                    alt={item.title || "Product Image"}
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "270px", // Fixed height
                      objectFit: "cover", // Ensures the image covers the container
                      borderRadius: "8px", // Optional: rounded corners
                    }}
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
                  <Link
                    to={`/product-details/${item.productId}`}
                    className="title fs-5 text-dark fw-medium"
                  >
                    {item.ProductName}
                  </Link>
                  {item.Description && (
                   <p className="mt-2 single-line">
                   {item.Description.slice(0, 60)}
                   {item.Description.length > 60 && '...'}
                 </p>
                  )}
                  <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                    <li className="list-inline-item mb-0">
                      <span className="text-muted">Price</span>
                      <p className="fw-medium mb-0">{item.Income}</p>
                    </li>
                    <li className="list-inline-item mb-0">
                      <span className="text-muted">Monthly Plan</span>
                      <p className="fw-medium mb-0">{item.Months} Month</p>
                    </li>
                    {/* <li className="list-inline-item mb-0 text-muted">
                      <span className="text-muted">Rating</span>
                      <ul className="fw-medium text-warning list-unstyled mb-0">
                        <li className="list-inline-item mb-0">
                          <i className="mdi mdi-star"></i>
                        </li>
                        <li className="list-inline-item mb-0">
                          <i className="mdi mdi-star"></i>
                        </li>
                        <li className="list-inline-item mb-0">
                          <i className="mdi mdi-star"></i>
                        </li>
                        <li className="list-inline-item mb-0">
                          <i className="mdi mdi-star"></i>
                        </li>
                        <li className="list-inline-item mb-0">
                          <i className="mdi mdi-star"></i>
                        </li>
                        <li className="list-inline-item mb-0 text-dark">
                          5.0(30)
                        </li>
                      </ul>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          <div className="col-12 mt-5 pt-2 mb-5">
            <div className="text-center">
              <Link to="/" className="mt-3 fs-6 text-primary">
                View More Products{" "}
                <i className="mdi mdi-arrow-right align-middle"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
