import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import CommonHeader from "../../superadmincompo/CommonHeader/index";
import { useParams } from "react-router-dom";

import { getPaymentUserId } from "../../../pages/services/api";
const API_URL = "http://localhost:8080/api/";

const ITEMS_PER_PAGE = 6;

const GetPaymentDetailsUser = () => {
  const { userId } = useParams();
  const [paymentData, setpaymentData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setselectedPayment] = useState([]);
console.log(paymentData)
const fetchPayment = async () => {
    setLoading(true);
    try {
      const data = await getPaymentUserId(userId); // Fetching data from the API
      console.log("Raw Data from API:", data);
  
      // Filter and map the data to extract user-specific data
      const userSpecificData = data
        ?.filter((item) => item.userId === userId) // Filter for matching userId
        .map((item) => ({
          ...item,
          isApproved: item.status === "approved", // Add `isApproved` field based on status
        }));
  
      // Update state with the processed data
      setpaymentData(userSpecificData || []);
      console.log("Filtered and Mapped Data:", userSpecificData);
  
    } catch (error) {
      console.error("Failed to fetch payment data:", error);
      setpaymentData([]); // Clear data on error
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPayment();
  }, [userId]);
  

  useEffect(() => {
    const newOffset = page * rowsPerPage;
    setCurrentItems(paymentData.slice(newOffset, newOffset + rowsPerPage));
  }, [page, rowsPerPage, paymentData]);

  const handleRefreshClick = () => {
    fetchPayment();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = () => {
    if (selectedPayment.length === currentItems.length) {
      setselectedPayment([]);
    } else {
      const allTimesheetIds = currentItems.map((item) => item._id);
      setselectedPayment(allTimesheetIds);
    }
  };

  const handleSelectTimesheet = (timesheetId) => {
    if (selectedPayment.includes(timesheetId)) {
      setselectedPayment(
        selectedPayment.filter((id) => id !== timesheetId)
      );
    } else {
      setselectedPayment([...selectedPayment, timesheetId]);
    }
  };

//   const handleApprove = async (bookingId) => {
//     try {
//       await approvedPayment(bookingId);

//       // Update the local state immediately
//       setpaymentData((prevData) =>
//         prevData.map((timesheet) =>
//           timesheet._id === bookingId
//             ? { ...timesheet, isApproved: true, status: "approved" }
//             : timesheet
//         )
//       );

//       toast.success("Payment approved successfully");
//     } catch (error) {
//       console.error("Failed to approve payment:", error);
//       toast.error("Failed to approve payment");
//     }
//   };

  return (
    <div>
      <div className="AdminDocument-table-container">
        <CommonHeader
          showSearchFilter={true}
          showIcons={{ plus: false, trash: false, rotate: true }}
          handleRefreshClick={handleRefreshClick}
        />
        {loading ? (
          <p>Loading</p>
        ) : (
          <div className="AdminDocument-tablebody">
            <table className="AdminDocument-table-data">
              <thead>
                <tr>
                  <th style={{ padding: "5px" }}>
                    <Checkbox
                      checked={
                        selectedPayment.length === currentItems.length &&
                        currentItems.length > 0
                      }
                      indeterminate={
                        selectedPayment.length > 0 &&
                        selectedPayment.length < currentItems.length
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>fullName</th>
                  <th>userId</th>
                  <th>date</th>
                  <th>amount</th>
                  <th>paymentscreensort</th>
                  {/* <th>Action </th> */}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((payment) => (
                  <tr key={payment._id}>
                    <td style={{ padding: "5px", textAlign: "left" }}>
                      <Checkbox
                        checked={selectedPayment.includes(payment._id)}
                        onChange={() => handleSelectTimesheet(payment._id)}
                      />
                    </td>
                    <td data-label="fullName">{payment.firstName}</td>
                    <td data-label="userId">{payment.userId}</td>
                    <td data-label="date">{payment.date}</td>
                    <td data-label="amount">{payment.amount}</td>
                    <td data-label="paymentscreensort">
                <img src={`${API_URL}${payment.paymentscreensort}`} alt="paymentscreensort" />
</td>

                    {/* <td data-label="Payment Status">
                      <div className="d-flex gap-2 ">
                        {payment.isApproved ? (
                          <span className="text-success">Approved</span>
                        ) : (
                          <>
                            <span className="text-warning">Pending</span>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleApprove(payment.userId)}
                            >
                              Approve
                            </button>
                          </>
                        )}
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <TablePagination
            component="div"
            count={paymentData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default GetPaymentDetailsUser;
