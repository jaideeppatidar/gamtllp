import React, { useState, useEffect } from "react";
import "./withdrawalRequest.css";
import Checkbox from "@mui/material/Checkbox";
import { TablePagination } from "@mui/material";
import CommonHeader from "../../../SuperAdmin/superadmincompo/CommonHeader/index";
import IconMapper from "../../../SuperAdmin/superadmincompo/IconMapper/IconMapper";
import debounce from "lodash/debounce";
import { ToastContainer, toast } from "react-toastify";
import ConfirmationModal from "../../../SuperAdmin/superadmincompo/ConfirmationModal/ConfirmationModal";
import "react-toastify/dist/ReactToastify.css";
import { GetWithdrawal, deleteUser } from "../../../pages/services/api";

const WithdrawalRequest = () => {
  const [approvalStatus, setApprovalStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await GetWithdrawal();
      setFilteredDocuments(data);
      setApprovalStatus(
        data.reduce((acc, user) => {
          acc[user.userId] = user.isApproved;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const debouncedSearch = debounce(() => {
        setFilteredDocuments(
          filteredDocuments.filter((doc) =>
            (doc.firstName && doc.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (doc.email && doc.email.toLowerCase().includes(searchTerm.toLowerCase()))
          )
        );
      }, 300);
  
      debouncedSearch();
      return () => {
        debouncedSearch.cancel();
      };
    } else {
      fetchData(); // If no search term, fetch all data again
    }
  }, [searchTerm]);
  

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
      setSelectedDocuments(currentDocuments.map((doc) => doc.id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleSelectDocument = (id) => {
    setSelectedDocuments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success("Employee deleted successfully");
      fetchData(); // Refresh data immediately after deletion
    } catch (error) {
      toast.error("Failed to delete document");
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await deleteUser(selectedDocuments);
      toast.success("Selected documents deleted successfully");
      fetchData(); // Refresh data immediately after bulk deletion
      setSelectedDocuments([]);
      setCurrentPage(0);
    } catch (error) {
      console.error("Error deleting selected documents:", error);
      toast.error("Failed to delete selected documents");
    }
  };

  // const handleApprove = async (id) => {
  //   try {
  //     await approveUser(id);
  //     toast.success("User approved successfully");
  //     setApprovalStatus((prev) => ({ ...prev, [id]: true }));
  //     fetchData(); // Refresh data immediately after approval
  //   } catch (error) {
  //     toast.error("Failed to approve user");
  //   }
  // };

  const handleOpenConfirmationModal = (id) => {
    setDocumentToDelete(id);
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setDocumentToDelete(null);
    setShowConfirmationModal(false);
  };

  const handleConfirmDelete = () => {
    if (documentToDelete) {
      handleDelete(documentToDelete);
      handleCloseConfirmationModal();
    }
  };

  const handleRefreshClick = () => {
    fetchData(); // Manual refresh if needed
  };

  return (
    <div>
      <div className="Admintable-container">
        <CommonHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleDeleteSelected={handleDeleteSelected}
          selectedPayslips={selectedDocuments}
          showIcons={{ plus: false, trash: true, rotate: true }}
          showSearchFilter={true}
          handleRefreshClick={handleRefreshClick}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="Admintablebody">
            <table className="Admintable-data">
              <thead>
                <tr>
                  <th>
                    <Checkbox
                      checked={
                        selectedDocuments.length === currentDocuments.length &&
                        currentDocuments.length > 0
                      }
                      indeterminate={
                        selectedDocuments.length > 0 &&
                        selectedDocuments.length < currentDocuments.length
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>UserId</th>
                  <th>Product Name</th>
                  <th>UserName</th>
                  <th>Branch Name</th>
                  <th>Bank Name</th>
                  <th>Account Number</th>
                  <th>withdrawalMoney</th>
                  <th>IFSC Code</th>
                  <th>Actions</th>
                  {/* <th>Approval Status</th> */}
                </tr>
              </thead>
              <tbody>
                {currentDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <Checkbox
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={() => handleSelectDocument(doc.id)}
                      />
                    </td>
                    <td>{doc.userId}</td>
                    <td>{doc.productName}</td>

                    <td>{doc.name}</td>
                    <td>{doc.branchName}</td>
                    <td>{doc.bankName}</td>
                    <td>{doc.accountNumber}</td>
                    <td>{doc.withdrawalMoney}</td>

                    <td>{doc.ifscCode}</td>
                    <td>
                      <button
                        className="AdminText-delete"
                        onClick={() => handleOpenConfirmationModal(doc.userId)}
                      >
                        <IconMapper
                          iconName="Deletebtn"
                          className="AdminDeletebtnView"
                        />
                      </button>
                    </td>
                    {/* <td>
                      {approvalStatus[doc.userId] ? "Approved" : "Pending"}
                      {!approvalStatus[doc.userId] && (
                        <Link
                          className="btn btn-primary"
                          onClick={() => handleApprove(doc.userId)}
                        >
                          Approve
                        </Link>
                      )}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="pagination-table-container">
          <TablePagination
            component="div"
            count={filteredDocuments.length}
            page={currentPage}
            onPageChange={handlePageChange}
            rowsPerPage={itemsPerPage}
            rowsPerPageOptions={[6, 10, 25]}
            onRowsPerPageChange={handleItemsPerPageChange}
          />
        </div>
        <ConfirmationModal
          open={showConfirmationModal}
          onClose={handleCloseConfirmationModal}
          onConfirm={handleConfirmDelete}
          title="Delete User"
          message="Are you sure you want to delete this User?"
        />
      </div>
      <ToastContainer style={{ zIndex: 9999 }} />
    </div>
  );
};

export default WithdrawalRequest;
