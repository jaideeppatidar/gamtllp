import React from 'react'
import Navbar from '../components/navbar'
import bg3 from "../assect/images/2.png";
import { Link } from 'react-router-dom';

const MyProduct = () => {
  return (
    <>
     
    <div>
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
        

    </div>
    </>
  )
}

export default MyProduct