import React from "react";
import bg2 from "../assect/images/bg/02.jpg";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import { blogData1 } from "../data/data";
export const Business = () => {
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
                      Business
                      </p>
                    </Link>
                  </div>
                </div>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  Find Your Business
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
                    <h4 className="title mb-3">Business Hub</h4>
                    <p className="text-muted para-desc mb-0 mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>
            </div>
        </div>

        <div className="row g-4 mt-0 mb-5">
            {blogData1.slice(0,3).map((item, index) =>{
                return(
                    <div className="col-lg-4 col-md-6" key={index}>
                        <div className="card blog blog-primary shadow rounded-3 overflow-hidden border-0">
                            <div className="card-img blog-image position-relative overflow-hidden rounded-0">
                                <div className="position-relative overflow-hidden">
                                    <img src={item.image} className="img-fluid" alt="Townter"/>
                                    <div className="card-overlay"></div>
                                </div>
                                <div className="blog-tag p-3">
                                    <Link to="" className="badge bg-primary">{item.tag}</Link>
                                </div>
                            </div>
                            <div className="card-body content p-0">
                                <div className="p-4">
                                    <Link to={`/blog-detail/${item.url}`} className="title fw-medium fs-5 text-dark">{item.title}</Link>
                                    <p className="text-muted mt-2">{item.desc}</p>

                                    <Link to="" className="text-dark read-more">Read More <i className="mdi mdi-chevron-right align-middle"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
            </div>
    </>
  );
};
