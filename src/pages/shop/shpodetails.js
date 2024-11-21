import React, { useState } from 'react';
import image1 from "../../assect/images/2.png";
import image2 from "../../assect/images/2.png";
import image3 from "../../assect/images/2.png";
import image4 from "../../assect/images/2.png";
import mainImag from "../../assect/images/2.png";
import bg2 from "../../assect/images/5.png";

import { Link } from "react-router-dom";
const ProductDetail = () => {
  const [mainImage, setMainImage] = useState(mainImag);
  const [selectedSize, setSelectedSize] = useState('Small');
  

  return (
    <>
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
                         ProductsDetails
                        </p>
                      </Link>
                    </div>
                  </div>
                  <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  ProductsDetails
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      <div className="container mt-5 mb-5"> 
        <div className="row ">
          <div className="col-md-6">
            <div className="main-image mb-3">
              <img 
                src={mainImage} 
                alt="Product" 
                className="img-fluid rounded shadow"
              />
            </div>
             <div className="grid grid-cols-4 gap-3 d-flex">
                <button 
                  onClick={() => setMainImage(image1)}
                  className={`p-2 rounded-md ${mainImage === image1 ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'}`}
                  
                >
                  <img 
                    src={image1} 
                    alt="Thumbnail 1"
                    className="w-full h-20 object-cover rounded"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                </button>
                <button 
                  onClick={() => setMainImage(image2)}
                  className={`p-2 rounded-md ${mainImage === image2 ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'}`}
                >
                  <img 
                    src={image2} 
                    alt="Thumbnail 2"
                    className="w-full h-20 object-cover rounded"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                </button>
                <button 
                  onClick={() => setMainImage(image3)}
                  className={`p-2 rounded-md ${mainImage === image3 ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'}`}
                >
                  <img 
                    src={image3} 
                    alt="Thumbnail 3"
                    className="w-full h-20 object-cover rounded"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                </button>
                <button 
                  onClick={() => setMainImage(image4)}
                  className={`p-2 rounded-md ${mainImage === image4 ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'}`}
                >
                  <img 
                    src={image4} 
                    alt="Thumbnail 4"
                    className="w-full h-20 object-cover rounded"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                </button>
              </div>
           
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">Great product name goes here</h2>
            
            <div className="mb-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rating">
                  {"★".repeat(3)}{"☆".repeat(2)}
                  <span className="ms-2 text-muted">7/10</span>
                </div>
              </div>
            </div>

            <div className="short-description mb-4">
              <h6>Short description</h6>
              <ul className="list-unstyled">
                <li className="text-muted mb-1">• Made in Russia</li>
                <li className="text-muted mb-1">• Wolf leather</li>
                <li className="text-muted mb-1">• Rubber material bottom</li>
                <li className="text-muted mb-1">• Dark blue color</li>
              </ul>
            </div>

            <div className="sizes mb-4">
              <h6>Available sizes</h6>
              <div className="btn-group">
                {['Small', 'Medium', 'Large', 'Babies'].map((size) => (
                  <button
                    key={size}
                    className={`btn ${
                      selectedSize === size 
                        ? 'btn-primary' 
                        : 'btn-outline-primary'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pricing mb-4">
              <h3 className="mb-2">$230.00</h3>
              <p className="text-muted">
                $32.00 / monthly installment
              </p>
            </div>

            <div className="d-flex gap-3">
              <button className="btn btn-primary btn-lg">
                Buy now
              </button>
              <button className="btn btn-outline-primary btn-lg">
                Add to card
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;