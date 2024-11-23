import React, { useState, useEffect } from "react";
import "../ProductSection/product.css";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import CommonHeader from "../../superadmincompo/CommonHeader/index";
import { Link } from "react-router-dom";
import { GetallPaymets } from "../../../pages/services/api";
const ITEMS_PER_PAGE = 6;
const PaymentDetailsAll = () => {
  const [paymentData, setpaymentData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [selectPayment, setselectPayment] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ITEMS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const getUniquePayment = (data) => {
    const uniquePayment = {};
    data.forEach((payment) => {
      if (!uniquePayment[payment.userId]) {
        uniquePayment[payment.userId] = payment;
      }
    });
    return Object.values(uniquePayment);
  };
  const fetchTimesheets = async () => {
    setLoading(true); 
    try {
      const data = await GetallPaymets();
      const uniqueData = getUniquePayment(data.PaymentDetails); 
      setpaymentData(uniqueData);
    } catch (error) {
      console.error("Failed to fetch timesheets:", error);
    } finally {
      setLoading(false); 
    }
  };
  useEffect(() => {
    fetchTimesheets();
  }, []);

  useEffect(() => {
    const filteredData = paymentData.filter((payment) => {
      const matchesSearch = payment.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter
        ? payment.status === statusFilter
        : true;
      return matchesSearch && matchesStatus;
    });
    const newOffset = page * rowsPerPage;
    setCurrentItems(filteredData.slice(newOffset, newOffset + rowsPerPage));
  }, [searchQuery, page, rowsPerPage, paymentData, statusFilter]);

  const handleSelectTimesheet = (id) => {
    setselectPayment((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setselectPayment(currentItems.map((item) => item._id));
    } else {
      setselectPayment([]);
    }
  };

  const handleDelete = () => {
    const newpaymentData = paymentData.filter(
      (payment) => !selectPayment.includes(payment._id)
    );
    setpaymentData(newpaymentData);
    setselectPayment([]);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleRefreshClick = () => {
    fetchTimesheets();
  };
  return (
    <div>
      
      <div className="AdminDocument-table-container">
        <CommonHeader
          searchTerm={searchQuery}
          setSearchTerm={setSearchQuery}
          handleDeleteSelected={handleDelete}
          selectedPayslips={selectPayment}
          showIcons={{ plus: false, trash: false, rotate: true }}
          handleSelectAll={handleSelectAll}
          currentDocuments={currentItems}
          selectedDocuments={selectPayment}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
          showStatusFilter={true}
          showCalendor={true}
          showSearchFilter={true}
          handleRefreshClick={handleRefreshClick}
        />
        {loading ? (
         <p>loading</p>
        ) : (
          <div className="AdminDocument-tablebody">
            <table className="AdminDocument-table-data">
              <thead>
                <tr>
                  <th style={{ padding: "5px" }}>
                    <Checkbox
                      checked={
                        selectPayment.length === currentItems.length &&
                        currentItems.length > 0
                      }
                      indeterminate={
                        selectPayment.length > 0 &&
                        selectPayment.length < currentItems.length
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>User ID</th>
                  <th>UserName</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((payment) => (
                  <tr key={payment._id}>
                    <td style={{ padding: "5px", textAlign: "left" }}>
                      <Checkbox
                        checked={selectPayment.includes(payment.userId)}
                        onChange={() => handleSelectTimesheet(payment.userId)}
                      />
                    </td>
                    <td  data-label="Emp_ID">
                      <Link
                      
                        to={`/superadmin/GetallPaymet/${payment.userId}`}
                      >
                        {payment.userId}
                      </Link>
                    </td>
                    <td  data-label="Emp_Name">
                     
                        {payment.firstName}
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}{" "}
        <TablePagination
          component="div"
          count={paymentData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default PaymentDetailsAll;
