import React, { useState, useEffect } from "react";
import "./SuperAdminExpenses.css";
import { TablePagination } from "@mui/material";
import CommonHeader from "../../superadmincompo/CommonHeader/index";
import DownloadButton from '../../superadmincompo/DownloadButton/index'
import {
  fetchAllExpenseData,
  approveExpense,
  rejectExpense,
} from "../../ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const profileImage = "/assets/images/profile.jpg";
const ITEMS_PER_PAGE = 6;

const AdminExpense = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllExpenseData();
      setAllDocuments(data);
      setFilteredDocuments(data);
    } catch (error) {
      console.error("Error fetching expenses:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let documentsToDisplay = allDocuments;

    if (searchTerm) {
      documentsToDisplay = documentsToDisplay.filter(
        (doc) =>
          (doc.employeeName &&
            doc.employeeName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (doc.expenseType &&
            doc.expenseType.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== "all") {
      documentsToDisplay = documentsToDisplay.filter(
        (doc) => doc.status === statusFilter
      );
    }

    documentsToDisplay = documentsToDisplay.filter((doc) => {
      const appliedDate = new Date(doc.expenseDate);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : new Date();

      if (from) {
        return appliedDate >= from && appliedDate <= to;
      }
      return true;
    });

    setFilteredDocuments(documentsToDisplay);
  }, [searchTerm, statusFilter, fromDate, toDate, allDocuments]);

  const currentDocuments = filteredDocuments.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedDocuments(currentDocuments.map((doc) => doc.expenseId));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleDeleteSelected = () => {
    const newFilteredDocuments = filteredDocuments.filter(
      (doc) => !selectedDocuments.includes(doc.expenseId)
    );
    setFilteredDocuments(newFilteredDocuments);
    setSelectedDocuments([]);
    setCurrentPage(0);
  };

  const handleResetFilters = () => {
    setFromDate("");
    setToDate("");
    setSearchTerm("");
    setStatusFilter("all");
    setSelectedDocuments([]);
    setCurrentPage(0);
    setFilteredDocuments(allDocuments);
  };

  const handleOpenDialog = (doc) => {
    setSelectedDoc(doc);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedDoc(null);
  };
  const handleRefreshClick = () => {
    fetchData();
  };

 

  const handleConfirm = async () => {
    if (selectedStatus) {
      try {
        if (selectedStatus === "Approved") {
          await approveExpense(selectedDoc.expenseId);
        } else if (selectedStatus === "Rejected") {
          await rejectExpense(selectedDoc.expenseId);
        }
        const updatedDocuments = filteredDocuments.map((doc) =>
          doc.expenseId === selectedDoc.expenseId
            ? { ...doc, status: selectedStatus }
            : doc
        );

        setFilteredDocuments(updatedDocuments);
        toast.success("Status updated successfully!");
        handleCloseDialog();
      } catch (error) {
        console.error("Error updating status:", error);
        toast.error("Error updating status: " + error.message);
      }
    }
  };

  return (
    <div>
     
      <div className="SuperAdminExpenses-table-container">
        <CommonHeader
          title="Expense Management"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleDeleteSelected={handleDeleteSelected}
          selectedDocuments={selectedDocuments}
          currentDocuments={currentDocuments}
          handleSelectAll={handleSelectAll}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
          showStatusFilter={true}
          showCalendor={true}
          showCheckbox={true}
          showIcons={{ plus: false, trash: true, rotate: true }}
          handleAddClick={() => alert("Add Expense Clicked")}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          handleResetFilters={handleResetFilters}
          showSearchFilter={true}
          handleRefreshClick={handleRefreshClick}
        />
        {loading ? (
          // <LinearIndeterminate />
          <p>loading</p>
        ) : (
          <div className="SuperAdminExpenses-tablebody">
            <table className="SuperAdminExpenses-table-data">
              <thead>
                <tr>
                  <th>Expense ID</th>
                  <th>Employee Name</th>
                  <th>Employee ID</th>
                  <th>Expense Date</th>
                  <th>Amount</th>
                  <th>Expense Type</th>
                  <th> Description</th>
                  <th>Receipt File</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td data-label="Expense Id">{doc.expenseId}</td>
                    <td data-label="Employee Name">{doc.employeeName}</td>
                    <td data-label="Employee Id">{doc.employeeId}</td>
                    <td data-label="Expense Date">{doc.expenseDate}</td>
                    <td data-label="Amount">{doc.amount}</td>
                    <td data-label="Expense Type">{doc.expenseType}</td>
                    <td data-label="Description">
                      <div className="SuperAdminExpenses-tooltip">
                        {doc.expenseDescription?.length > 5
                          ? doc.expenseDescription.slice(0, 5) + "..."
                          : doc.expenseDescription}
                        <span className="SuperAdminExpenses-tooltip-text">
                          {doc.expenseDescription}
                        </span>
                      </div>
                    </td>
                    <td data-label="Receipt File">{doc.receiptFileName}</td>
                    <td data-label="Status" style={{ cursor: "pointer" }}>
                      <div
                        onClick={() => handleOpenDialog(doc)}
                        className={
                          doc.status === "Approved"
                            ? "status-approve"
                            : doc.status === "Rejected"
                            ? "status-reject"
                            : doc.status === "Pending"
                            ? "status-Pending."
                            : ""
                        }
                      >
                        {doc.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="SuperAdminExpenses-pagination-table-container">
              <DownloadButton
                onClick={() => alert("Download")}
                className="SuperAdminExpensesdownload-button-table-data"
              />

              <TablePagination
                component="div"
                count={filteredDocuments.length}
                page={currentPage}
                onPageChange={handlePageChange}
                rowsPerPage={itemsPerPage}
                rowsPerPageOptions={[6, 10, 20]}
                onRowsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          </div>
        )}{" "}
        <div
          className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center ${
            open ? "block" : "hidden"
          }`}
        >
          <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">
                Change Status for {selectedDoc?.employeeName}
              </h3>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">
                Expense ID: {selectedDoc?.expenseId}
              </p>
              <p className="text-gray-700 mt-2">Select status:</p>
              <div className="flex items-center space-x-4 mt-4">
                <button
                  className={`px-4 py-2 rounded-md focus:outline-none transition duration-300 ${
                    selectedStatus === "Approved"
                      ? "bg-[#d4edda] text-[#155724] font-bold"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedStatus("Approved")}
                >
                  Approved
                </button>
                <button
                  className={`px-4 py-2 rounded-md focus:outline-none transition duration-300 ${
                    selectedStatus === "Rejected"
                      ? "bg-[#f8d7da] text-[#721c24] font-bold"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedStatus("Rejected")}
                >
                  Rejected
                </button>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              {selectedStatus && (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600 transition duration-300"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              )}
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md focus:outline-none hover:bg-gray-300 transition duration-300"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminExpense;
