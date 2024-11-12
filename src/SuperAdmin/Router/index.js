import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SuperAdminLayout from "../components/SuperAdminLayout/SuperAdminLayout";
import SuperAdminDashboard from "../page/SuperAdminDashboard/SuperAdminDashboard";
import Expenses from "../page/SuperAdminExpenses/SuperAdminExpense";
import SuperAdminDocuments from "../page/DocumentSuperAdmin/SuperAdminDocuments";
import DocumentPage from "../page/DocumentSuperAdmin/DocumentPage";
import MeetingRecordPage from "../page/MeetingRecordPage/MeetingRecordPage";
import AssetManagementPage from "../page/AssetManagementPage/AssetManagementPage";
import AllEmployees from "../page/Employees/AllEmployee/AllEmployee";
import BookingProduct from "../page/BookProdcutUser/BookProductUser";
import BookingProductUser from '../page/BookProdcutUser/BookProductDetails'
import Login from "../auth/login";
import { PrivateRoute } from "./PrivateRoute";

const SuperAdminRouting = () => {
  return (
    <Routes>
      {/* Login route should be outside the layout */}
      <Route path="login" element={<Login />} />

      {/* Redirect root to dashboard if authenticated, otherwise to login */}
      <Route 
        path="" 
        element={
          <PrivateRoute>
            <Navigate to="dashboard" replace />
          </PrivateRoute>
        } 
      />

      {/* Protected routes within SuperAdminLayout */}
      <Route
        element={
          <PrivateRoute>
            <SuperAdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="documentsadmin" element={<SuperAdminDocuments />} />
        <Route path="meetingRecordPage" element={<MeetingRecordPage />} />
        <Route path="assets" element={<AssetManagementPage />} />
        <Route path="documentPage" element={<DocumentPage />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="allEmployee" element={<AllEmployees />} />
        <Route path="bookingdata" element={<BookingProduct />} />
        <Route path="bookingdataUser/:userId" element={<BookingProductUser />} />



      </Route>

      {/* Catch all route - redirect to dashboard or login */}
      <Route 
        path="*" 
        element={
          <Navigate to="dashboard" replace />
        }
      />
    </Routes>
  );
};

export default SuperAdminRouting;