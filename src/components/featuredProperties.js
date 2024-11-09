import React from "react";
import { Link } from "react-router-dom";
import { propertyData } from "../data/data";
import { FiHome, FiHeart, FiCamera } from "../assect/icons/vander";

export default function FuaturedProperties() {
  return (
    <>
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
    {propertyData.slice(0, 6).map((item, index) => (
        <div className="col-lg-4 col-md-6 col-12" key={index}>
            <div className="card property border-0 shadow position-relative overflow-hidden rounded-3">
                <div className="property-image position-relative overflow-hidden shadow">
                    <img 
                        src={item.image} 
                        className="img-fluid" 
                        alt={item.title || "Product Image"} 
                    />
                    <ul className="list-unstyled property-icon">
                        <li><Link to="#" className="btn btn-sm btn-icon btn-pills btn-primary"><FiHome className="icons" /></Link></li>
                        <li className="mt-1"><Link to="#" className="btn btn-sm btn-icon btn-pills btn-primary"><FiHeart className="icons" /></Link></li>
                        <li className="mt-1"><Link to="#" className="btn btn-sm btn-icon btn-pills btn-primary"><FiCamera className="icons" /></Link></li>
                    </ul>
                </div>
                <div className="card-body content p-4">
                    <Link to={`/property-detail/${item.id}`} className="title fs-5 text-dark fw-medium">
                        {item.title}
                    </Link>
                    {item.description && <p className="mt-2">{item.description}</p>}
                    <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                        <li className="list-inline-item mb-0">
                            <span className="text-muted">Price</span>
                            <p className="fw-medium mb-0">{item.prices.investment}</p>
                        </li>
                        <li className="list-inline-item mb-0 text-muted">
                            <span className="text-muted">Rating</span>
                            <ul className="fw-medium text-warning list-unstyled mb-0">
                                <li className="list-inline-item mb-0"><i className="mdi mdi-star"></i></li>
                                <li className="list-inline-item mb-0"><i className="mdi mdi-star"></i></li>
                                <li className="list-inline-item mb-0"><i className="mdi mdi-star"></i></li>
                                <li className="list-inline-item mb-0"><i className="mdi mdi-star"></i></li>
                                <li className="list-inline-item mb-0"><i className="mdi mdi-star"></i></li>
                                <li className="list-inline-item mb-0 text-dark">5.0(30)</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    ))}

    <div className="col-12 mt-4 pt-2">
        <div className="text-center">
            <Link to="/grid" className="mt-3 fs-6 text-primary">
                View More Products <i className="mdi mdi-arrow-right align-middle"></i>
            </Link>
        </div>
    </div>
</div>

    </>
  );
}
