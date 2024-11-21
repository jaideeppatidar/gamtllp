import React from "react";
import { Link } from "react-router-dom";
import bg2 from "../../assect/images/bg/03.jpg"
import { propertyData } from "../../data/data";
import {FiHome, FiHeart, FiCamera} from "../../assect/icons/vander"

export default function GridSidebar(){
    return(
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
                        ShopProducts
                        </p>
                      </Link>
                    </div>
                  </div>
                  <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  ShopProducts
                  </h5>
                </div>
              </div>
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
        <section className="section">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="card bg-white p-4 rounded-3 shadow sticky-bar">
                            <div>
                                <h6 className="mb-0">Search Products</h6>

                                <div className="search-bar mt-2">
                                    <div id="itemSearch2" className="menu-search mb-0">
                                        <form role="search" method="get" id="searchItemform2" className="searchform">
                                            <input type="text" className="form-control rounded-3 border" name="s" id="searchItem2" placeholder="Search..."/>
                                            <input type="submit" id="searchItemsubmit2" value="Search"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <h6 className="mb-0">Categories</h6>
                                <select className="form-select form-control border mt-2" aria-label="Default select example">
                                    <option value="re">SoyaBeenOil</option>
                                    <option value="la">Rise</option>
                                    <option value="co">White Chana</option>
                                    <option value="ind">Deshi Chana</option>
                                    <option value="inv">Alsi Tail</option>
                                </select>
                            </div>
                         

                            <div className="mt-4">
                                <Link to="" className="btn btn-primary w-100">Apply Filter</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-6 col-12">
                        <div className="row g-4">
                            {propertyData.slice(0,8).map((item, index) =>{
                                return(
                                <div className="col-lg-6 col-12" key={index}>
                                    <div className="card property border-0 shadow position-relative overflow-hidden rounded-3">
                                        <div className="property-image position-relative overflow-hidden shadow">
                                            <img src={item.image} className="img-fluid" alt=""/>
                                            <ul className="list-unstyled property-icon">
                                                <li className=""><Link to="#" className="btn btn-sm btn-icon btn-pills btn-primary"><FiHome className="icons"/></Link></li>
                                                <li className="mt-1"><Link to="#" className="btn btn-sm btn-icon btn-pills btn-primary"><FiHeart className="icons"/></Link></li>
                                                <li className="mt-1"><Link to="#" className="btn btn-sm btn-icon btn-pills btn-primary"><FiCamera className="icons"/></Link></li>
                                            </ul>
                                        </div>
                                        <div className="card-body content p-4">
                                            <Link to={`/property-detail/${item.id}`} className="title fs-5 text-dark fw-medium">{item.title}</Link>

                                            
                                            <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                                                <li className="list-inline-item mb-0">
                                                    <span className="text-muted">Price</span>
                                                    <p className="fw-medium mb-0">$5000</p>
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
                                )
                            })}
                        </div>
        
                        <div className="row">
                            <div className="col-12 mt-4 pt-2">
                                <ul className="pagination justify-content-center mb-0">
                                    <li className="page-item">
                                        <Link className="page-link" to="#" aria-label="Previous">
                                            <span aria-hidden="true"><i className="mdi mdi-chevron-left fs-6"></i></span>
                                        </Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                    <li className="page-item active"><Link className="page-link" to="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link" to="#" aria-label="Next">
                                            <span aria-hidden="true"><i className="mdi mdi-chevron-right fs-6"></i></span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
        </>
    )
}

