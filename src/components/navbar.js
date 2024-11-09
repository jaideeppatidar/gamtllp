

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../assect/images/logo.png";
import logoLight from "../assect/images/logo.png";
import { FiSearch, FiUser } from "../assect/icons/vander";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice/authSlice";
export default function Navbar({ navClass, logolight, menuClass }) {
  const [scroll, setScroll] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, firstName } = useSelector((state) => state.auth.user); 
  console.log("Navbar user:", email, firstName);
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Access isAuthenticated directly


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
    console.log("Profile modal state:", !profileModal);
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
                <img src={logoDark} className="l-dark" alt="" style={{height:'65px'}} />
                <img src={logoLight} className="l-light" alt="" style={{height:'65px'}} />
              </span>
              <img src={logoLight} className="logo-dark-mode" alt="" style={{height:'65px'}} />
            </Link>
          ) : (
            <Link className="logo" to="/">
              <img src={logoDark} className="logo-light-mode" alt="" style={{height:'65px'}} />
              <img src={logoLight} className="logo-dark-mode" alt="" style={{height:'65px'}} />
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
                <button
                  type="button"
                  className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary"
                  onClick={() => setModal(!modal)}
                >
                  <FiSearch className="icons" />
                </button>
                <div
                  className={`${
                    modal ? "show" : ""
                  } dropdown-menu dd-menu dropdown-menu-start bg-white rounded-3 border-0 mt-3 p-0 right-0`}
                  style={{ width: "240px", right: "0" }}
                >
                  <div className="search-bar">
                    <input
                      type="text"
                      className="form-control rounded-3 border"
                      placeholder="Search..."
                    />
                  </div>
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
              <div className="modal-content">
                <span className="close" onClick={handleProfileClick}>
                  &times;
                </span>
                <h4>User Profile</h4>
                <p>Email: {email}</p>
                <p>Name:  {firstName}</p>
                <Link to="/profile" onClick={handleProfileClick}>
                  View Profile
                </Link>
                <hr />
                <button onClick={handleLogout} className="btn btn-danger">
                  Logout
                </button>
              </div>
            </div>
          )}

          <div id="navigation" style={{ display: isMenu ? "block" : "none" }}>
            <ul className={menuClass}>
              <li >
                <Link to="/" >Home</Link>
              </li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li className="has-submenu parent-menu-item">
                <Link to="#">Products</Link>
                <ul className="submenu">
                  <li>
                    <Link to="/list-sidebar">Products</Link>
                  </li>
                  {/* <li>
                    <Link to="/property-detail">Products Details</Link>
                  </li> */}
                </ul>
              </li>
              <li>
                <Link to="/buy">Buy</Link>
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
