import React from "react";
import {  Box } from "@mui/material";
import ProfileImage from "../../../assect/images/gamtllp.png";
import logo from "../../../assect/images/logo.png";

import "./SuperAdminDashboard.css";
const Dashboard = () => {
  return (
    <Box className="dashboard">
      <Box className="dashboard-header">
        <Box className="left-side">
          <img src={ProfileImage} alt="User Avatar" className="user-avatar" />
          <Box ml={2} className="text-black d-flex gap-2 flex-column">
            <strong variant="h5">Team</strong>
            <strong variant="subtitle1">
              Geet Agro Multitrade LLP Company
            </strong>
          </Box>
        </Box>
        <Box className="">
          <div className="header-logo">
            <img alt="HireFlex247 Logo" src={logo} className="user-avatar" />
          </div>
        </Box>
      </Box>
      <Box className="card-container mt-4">
      <div className="row">
        {/* Card 1 */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <Box className="card text-center p-4 shadow">
            <h5 className="card-title">Total Employees</h5>
            <p className="card-text display-4">150</p>
          </Box>
        </div>

        {/* Card 2 */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <Box className="card text-center p-4 shadow">
            <h5 className="card-title">Total Employees</h5>
            <p className="card-text display-4">150</p>
          </Box>
        </div>

        {/* Card 3 */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <Box className="card text-center p-4 shadow">
            <h5 className="card-title">Total Employees</h5>
            <p className="card-text display-4">150</p>
          </Box>
        </div>

        {/* Card 4 */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <Box className="card text-center p-4 shadow">
            <h5 className="card-title">Total Employees</h5>
            <p className="card-text display-4">150</p>
          </Box>
        </div>

        {/* Card 5 */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <Box className="card text-center p-4 shadow">
            <h5 className="card-title">Total Employees</h5>
            <p className="card-text display-4">150</p>
          </Box>
        </div>

        {/* Card 6 */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <Box className="card text-center p-4 shadow">
            <h5 className="card-title">Total Employees</h5>
            <p className="card-text display-4">150</p>
          </Box>
        </div>

        {/* Card 7 */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <Box className="card text-center p-4 shadow">
            <h5 className="card-title">Total Employees</h5>
            <p className="card-text display-4">150</p>
          </Box>
        </div>

        {/* Card 8 */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <Box className="card text-center p-4 shadow">
            <h5 className="card-title">Total Employees</h5>
            <p className="card-text display-4">150</p>
          </Box>
        </div>
      </div>
    </Box>
    </Box>
  );
};

export default Dashboard;
