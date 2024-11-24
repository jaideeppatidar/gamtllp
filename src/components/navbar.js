import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../assect/images/logo.png";
import logoLight from "../assect/images/logo.png";
import "./navbar.css";

import {  FiUser } from "../assect/icons/vander";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice/authSlice";

export default function Navbar({ navClass, logolight, menuClass }) {
  const [scroll, setScroll] = useState(false);
  const [isMenu, setisMenu] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, firstName } = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const links = document.querySelectorAll(".has-submenu > .menu-arrow");
    const handleMenuToggle = (e) => {
      e.stopPropagation(); // Stop click propagation
      const submenu = e.currentTarget.parentElement.querySelector(".submenu");
      if (submenu) {
        submenu.classList.toggle("open"); // Toggle the 'open' class
      }
    };

    links.forEach((arrow) => {
      arrow.addEventListener("click", handleMenuToggle);
    });

    // Cleanup event listeners on component unmount
    return () => {
      links.forEach((arrow) => {
        arrow.removeEventListener("click", handleMenuToggle);
      });
    };
  }, []);

  var mybutton = document.getElementById("back-to-top");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (mybutton != null) {
      if (
        document.body.scrollTop > 500 ||
        document.documentElement.scrollTop > 500
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  }

  // Toggle menu
  const toggleMenu = () => {
    setisMenu(!isMenu);
    const navElement = document.getElementById("navigation");
    if (navElement) {
      const links = navElement.querySelectorAll(".has-submenu > .menu-arrow");
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault(); // Prevent default link behavior
          const submenu = link.nextElementSibling; // Locate the submenu
          if (submenu && submenu.classList.contains("submenu")) {
            submenu.classList.toggle("open"); // Toggle 'open' class
          }
        });
      });
    }
  };

  function getClosest(elem, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(
              s
            ),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }

    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  }
  const handleProfileClick = () => {
    setProfileModal(!profileModal);
  };
  function activateMenu() {
    var menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems) {
      var matchingMenuItem = null;
      for (var idx = 0; idx < menuItems.length; idx++) {
        if (menuItems[idx].href === window.location.href) {
          matchingMenuItem = menuItems[idx];
        }
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");

        var immediateParent = getClosest(matchingMenuItem, "li");

        if (immediateParent) {
          immediateParent.classList.add("active");
        }

        var parent = getClosest(immediateParent, ".child-menu-item");
        if (parent) {
          parent.classList.add("active");
        }

        var parent = getClosest(parent || immediateParent, ".parent-menu-item");

        if (parent) {
          parent.classList.add("active");

          var parentMenuitem = parent.querySelector(".menu-item");
          if (parentMenuitem) {
            parentMenuitem.classList.add("active");
          }

          var parentOfParent = getClosest(parent, ".parent-parent-menu-item");
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          }
        } else {
          var parentOfParent = getClosest(
            matchingMenuItem,
            ".parent-parent-menu-item"
          );
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          }
        }
      }
    }
  }
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
                id="isToggle"
                onClick={() => toggleMenu()}
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

              <li className="has-submenu parent-parent-menu-item">
                <Link to="/products" onClick={toggleMenu}>
                  Products
                </Link>
                <span className="menu-arrow"></span>
                <ul className="submenu">
                  <li>
                    <Link to="/myproduct">My Products</Link>
                  </li>
                  <li>
                    <Link to="/buy">Buy Products</Link>
                  </li>
                  <li>
                    <Link to="/shopproductdetails">Shop Product Details</Link>
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
