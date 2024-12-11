import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css"
import IconMapper from "../../superadmincompo/IconMapper/IconMapper";
import logo from "../../../assect/images/logo.png";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1000 || window.innerHeight <= 720);
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 1000 || window.innerHeight <= 720);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleItemClick = (path) => {
    setActiveItem(path);
    if (isMobileView) {
      toggleSidebar();
    }
  };

  return (
    <>
      {isMobileView ? (
        <div className={`sidebar-popup ${isOpen ? "open" : ""}`}>
          <div className="sidebar-content">
            <div className="sidebar-header">
              <div className="popup-sidebar1">
                <div onClick={toggleSidebar} className="toggleMenu">
                  <img src={logo} alt="Logo" />
                </div>
                <div className="close-icon-sidebar" onClick={toggleSidebar}>
                  <IconMapper iconName="close" isFontAwesome={true} />
                </div>
              </div>
              <hr />
              <div className="slider2">
              <li
                className={`list-item ${activeItem === "/superadmin/dashboard" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/dashboard")}
              >
                <Link to="/superadmin/dashboard" className="list-item">
                  <IconMapper className="ImageIcons" iconName="MyDocuments" />
                  {isOpen && <span className="list-item-text">Dashbaord</span>}
                </Link>
              </li>

              
              <li
                className={`list-item ${activeItem === "/superadmin/documentsadmin" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/documentsadmin")}
              >
                <Link to="/superadmin/documentsadmin" className="list-item">
                  <IconMapper className="ImageIcons" iconName="MyDocuments" />
                  {isOpen && <span className="list-item-text">Documents</span>}
                </Link>
              </li>
              
                

               
              
               
             
             
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="sidebar" style={{ width: isOpen ? "268px" : "68px" }}>
          <div className="sidebar-header">
            <div className="slider1">
              <div onClick={toggleSidebar} className="toggleMenu">
                <li className="list-items">
                  <IconMapper
                    className="ImageIcon"
                    iconName="bars"
                    isFontAwesome={true}
                  />
                  {isOpen && (
                    <img
                      className="LogoImage"
                      src={logo}
                      alt="Logo"
                    />
                  )}
                </li>
              </div>
            </div>
            <div className="slider2">
             
            

              
             
<li
                className={`list-item ${activeItem === "/superadmin/dashboard" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/dashboard")}
              >
                <Link to="/superadmin/dashboard" className="list-item">
                  <IconMapper className="ImageIcons" iconName="MyDocuments" />
                  {isOpen && <span className="list-item-text">Dashbaord</span>}
                </Link>
              </li>
              <li
                className={`list-item ${activeItem === "/superadmin/allEmployee" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/allEmployee")}
              >
                <Link to="/superadmin/allEmployee" className="list-item">
                  <IconMapper className="ImageIcons" iconName="MyDocuments" />
                  {isOpen && <span className="list-item-text">All Users</span>}
                </Link>
              </li>

              
              <li
                className={`list-item ${activeItem === "/superadmin/documentsadmin" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/documentsadmin")}
              >
                <Link to="/superadmin/documentsadmin" className="list-item">
                  <IconMapper className="ImageIcons" iconName="MyDocuments" />
                  {isOpen && <span className="list-item-text"> All Product</span>}
                </Link>
              </li>

              <li
                className={`list-item ${activeItem === "/superadmin/shopProduct" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/shopProduct")}
              >
                <Link to="/superadmin/shopProduct" className="list-item">
                  <IconMapper className="ImageIcons" iconName="MyDocuments" />
                  {isOpen && <span className="list-item-text"> All Shop Product</span>}
                </Link>
              </li>


              <li
                className={`list-item ${activeItem === "/superadmin/bookingdata" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/bookingdata")}
              >
                <Link to="/superadmin/bookingdata" className="list-item">
                  <IconMapper className="ImageIcons" iconName="MyDocuments" />
                  {isOpen && <span className="list-item-text">BookingProduct</span>}
                </Link>
              </li>
              <li
                className={`list-item ${activeItem === "/superadmin/WithdrawalRequest" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/WithdrawalRequest")}
              >
                <Link to="/superadmin/WithdrawalRequest" className="list-item">
                  <IconMapper className="ImageIcons" iconName="MyDocuments" />
                  {isOpen && <span className="list-item-text">Withdrawal</span>}
                </Link>
              </li>
              <li
                className={`list-item ${activeItem === "/superadmin/GetAllBusinessCategory" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/GetAllBusinessCategory")}
              >
                <Link to="/superadmin/GetAllBusinessCategory" className="list-item">
                  <IconMapper className="ImageIcons" iconName="MyDocuments" />
                  {isOpen && <span className="list-item-text">AddCategoryBusniess</span>}
                </Link>
              </li>
              <li
                className={`list-item ${activeItem === "/superadmin/GetallPaymet" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/GetallPaymet")}
              >
                <Link to="/superadmin/GetallPaymet" className="list-item">
                  <IconMapper className="ImageIcons" iconName="MyDocuments" />
                  {isOpen && <span className="list-item-text">GetallPaymet</span>}
                </Link>
              </li>
              <li
                className={`list-item ${activeItem === "/superadmin/addincome" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/addincome")}
              >
                <Link to="/superadmin/addincome" className="list-item">
                  <IconMapper className="ImageIcons" iconName="MyDocuments" />
                  {isOpen && <span className="list-item-text">AddIncome</span>}
                </Link>
              </li>

              <li
                className={`list-item ${activeItem === "/superadmin/profiteicome" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/profiteicome")}
              >
                <Link to="/superadmin/profiteicome" className="list-item">
                  <IconMapper className="ImageIcons" iconName="MyDocuments" />
                  {isOpen && <span className="list-item-text">ProfitIncome</span>}
                </Link>
              </li>
             
              
              
               
            
              {/* <li className={`list-item ${activeItem === "/superadmin/account" ? "active" : ""}`} 
                onClick={() => handleItemClick("/admin/account")}>
                <Link to="/superadmin/account" className="list-item">
                  <IconMapper className="ImageIcons" iconName="LogoMini" />
                  {isOpen && <span className="list-item-text">Account</span>}
                </Link>
              </li>
              <li className={`list-item ${activeItem === "/superadmin/account" ? "active" : ""}`}
              onClick={handleLogout}>
                <span className="list-item">
                  <IconMapper className="ImageIcons" iconName="Logout" />
                  {isOpen && <span className="list-item-text">Logout</span>}
                </span>
              </li> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
