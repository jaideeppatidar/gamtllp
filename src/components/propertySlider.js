import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { propertyData } from "../data/data";

import { FiHome, FiHeart, FiCamera } from "../assect/icons/vander";
import TinySlider from "tiny-slider-react";
import "../../node_modules/tiny-slider/dist/tiny-slider.css";
import { fetchProductData } from "../pages/services/api";
const IMAGE_BASE_URL = "http://localhost:8080/";

export default function ProprtySlider() {
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
  const settings = {
    container: ".tiny-slide-three",
    controls: true,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    controlsText: [
      '<i class="mdi mdi-chevron-left "></i>',
      '<i class="mdi mdi-chevron-right"></i>',
    ],
    nav: false,
    speed: 400,
    gutter: 0,
    responsive: {
      1025: {
        items: 3,
      },

      992: {
        items: 2,
      },

      767: {
        items: 2,
      },

      320: {
        items: 1,
      },
    },
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="tiny-slide-three">
          <TinySlider settings={settings}>
            {productData.map((item, index) => {
              return (
                <div className="tiny-slide" key={index}>
                  <div className="card property border-0 shadow position-relative overflow-hidden rounded-3 m-3">
                    <div className="property-image position-relative overflow-hidden shadow">
                      <img
                        src={`${IMAGE_BASE_URL}${item.image}`}
                        className="img-fluid"
                        alt=""
                        style={{
                          width: "100%",
                          height: "250px", // Fixed height
                          objectFit: "cover", // Ensures the image covers the container
                          borderRadius: "8px", // Optional: rounded corners
                        }}
                      />
                      <ul className="list-unstyled property-icon">
                        <li className="">
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
                      <h2
                       
                        className="title fs-5 text-dark fw-medium"
                      >
                        {item.ProductName}
                      </h2>

                      <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                        <li className="list-inline-item mb-0">
                          <span className="text-muted">Price</span>
                          <p className="fw-medium mb-0">{item.Income}</p>
                        </li>
                        <li className="list-inline-item mb-0 text-muted">
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
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </TinySlider>
        </div>
      </div>
    </div>
  );
}
