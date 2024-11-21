import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../assect/images/logo.png";
import logoLight from "../assect/images/logo.png";
import { FiUser } from "../assect/icons/vander";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice/authSlice";
export default function Navbar({ navClass, logolight, menuClass }) {
  const [scroll, setScroll] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, firstName } = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 0);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const toggleMenu = () => setIsMenu(!isMenu);
  const handleProfileClick = () => {
    setProfileModal(!profileModal);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth-login");
  };

  return (
    <>
      <header
        id="topnav"
        className={`${scroll ? "nav-sticky" : ""} ${navClass}`}
      >
        <div className="container">
          {logolight === true ? (
            <Link className="logo" to="/">
              <span className="logo-light-mode">
                <img
                  src={logoDark}
                  className="l-dark"
                  alt=""
                  style={{ height: "65px" }}
                />
                <img
                  src={logoLight}
                  className="l-light"
                  alt=""
                  style={{ height: "65px" }}
                />
              </span>
              <img
                src={logoLight}
                className="logo-dark-mode"
                alt=""
                style={{ height: "65px" }}
              />
            </Link>
          ) : (
            <Link className="logo" to="/">
              <img
                src={logoDark}
                className="logo-light-mode"
                alt=""
                style={{ height: "65px" }}
              />
              <img
                src={logoLight}
                className="logo-dark-mode"
                alt=""
                style={{ height: "65px" }}
              />
            </Link>
          )}
          <div className="menu-extras">
            <div className="menu-item">
              <Link
                className={`navbar-toggle ${isMenu ? "open" : ""}`}
                onClick={toggleMenu}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </div>
          </div>

          <ul className="buy-button list-inline mb-0">
            <li className="list-inline-item ps-1 mb-0">
              <div className="dropdown">
                <div
                  id="navigation"
                  style={{ display: isMenu ? "block" : "none" }}
                >
                  {/* <ul className={menuClass}> */}
                  <li>
                    <Link to="">{firstName}</Link>
                  </li>
                  {/* </ul> */}
                </div>
              </div>
            </li>
            <li className="list-inline-item ps-1 mb-0">
              {isAuthenticated ? (
                <button
                  onClick={handleProfileClick}
                  className="btn btn-sm btn-icon btn-primary"
                >
                  <FiUser className="icons" />
                </button>
              ) : (
                <Link
                  to="/auth-login"
                  className="btn btn-sm btn-icon btn-primary"
                >
                  <FiUser className="icons" />
                </Link>
              )}
            </li>
          </ul>

          {/* Profile Modal */}
          {profileModal && (
            <div className="profile-modal">
              <div className="modal-contents">
                <span className="close" onClick={handleProfileClick}>
                  &times;
                </span>
                {/* <h4>User Profile</h4> */}
                <p className="m-0">Email: {email}</p>
                <p className="m-0">Name: {firstName}</p>
                <Link to="/userDashbaord" onClick={handleProfileClick}>
                  View Profile
                </Link>
                <hr />
                <Link to="/bank-details" onClick={handleProfileClick}>
                  Payment Details
                </Link>
                <hr />
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
              </div>
            </div>
          )}

          <div id="navigation" style={{ display: isMenu ? "block" : "none" }}>
            <ul className={menuClass}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/shopproduct">Shop</Link>
              </li>

              <li className="has-submenu parent-menu-item">
                <Link to="/products"> Products </Link>
                <span className="submenu-arrow"></span>
                <ul className="submenu">
                  <li>
                    <Link to="/myproduct" className="sub-menu-item">
                      {" "}
                      My Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/buy" className="sub-menu-item">
                      {" "}
                      Buy Products
                    </Link>
                    
                  </li>
                  <li>
                    <Link to="/shopproductdetails" className="sub-menu-item">
                      {" "}
                      ShopProductDetails
                    </Link>
                    
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/business">Business</Link>
              </li>
              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
