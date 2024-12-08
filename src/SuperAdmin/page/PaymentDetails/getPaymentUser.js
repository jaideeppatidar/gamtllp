import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import CommonHeader from "../../superadmincompo/CommonHeader/index";
import Modal from "@mui/material/Modal";
import { useParams } from "react-router-dom";

import { getPaymentUserId } from "../../../pages/services/api";
const IMAGE_BASE_URL = "https://api.gamtllp.com/"; 
// const IMAGE_BASE_URL = " http://localhost:7070/";
const ITEMS_PER_PAGE = 6;

const GetPaymentDetailsUser = () => {
  const { userId } = useParams();
  const [paymentData, setpaymentData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setselectedPayment] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const fetchPayment = async () => {
    setLoading(true);
    try {
      const data = await getPaymentUserId(userId);
      const userSpecificData = data
        ?.filter((item) => item.userId === userId)
        .map((item) => ({
          ...item,
          isApproved: item.status === "approved",
        }));
      setpaymentData(userSpecificData || []);
    } catch (error) {
      console.error("Failed to fetch payment data:", error);
      setpaymentData([]);
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

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalImage("");
  };

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
                      <img
                        src={`${IMAGE_BASE_URL}${payment.paymentscreensort}`}
                        alt="paymentscreensort"
                        className="img-fluid"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleImageClick(
                            `${IMAGE_BASE_URL}${payment.paymentscreensort}`
                          )
                        }
                      />
                    </td>
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

      {/* Modal for showing the image */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: "50%",
            maxHeight: "auto",
          }}
        >
          <img
            src={modalImage}
            alt="Large View"
            style={{
              width: "50%",
              height: "auto",
              borderRadius: "8px",
              height: "auto",
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default GetPaymentDetailsUser;
