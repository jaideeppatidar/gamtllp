import React, { useState, useEffect } from "react";
import "./AllEmployee.css";
import Checkbox from "@mui/material/Checkbox";
import { TablePagination } from "@mui/material";
import CommonHeader from "../../../superadmincompo/CommonHeader/index";
import IconMapper from "../../../superadmincompo/IconMapper/IconMapper";
import debounce from "lodash/debounce";
import { ToastContainer, toast } from "react-toastify";
import ConfirmationModal from "../../../superadmincompo/ConfirmationModal/ConfirmationModal";
import "react-toastify/dist/ReactToastify.css";
import { getAllUserInSuperadmin,deleteUser } from "../../../../pages/services/api";

const AllEmployee = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);

  const fetchData = async () => {
      const data = await getAllUserInSuperadmin();
      console.log(data);
      setFilteredDocuments(data.users);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setFilteredDocuments((prevDocuments) =>
        prevDocuments.filter(
          (doc) =>
            (doc.firstName &&
              doc.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (doc.email &&
              doc.email.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    }, 300);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
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
      await deleteUser(id); // Use 'id' instead of 'userId'
      setFilteredDocuments(filteredDocuments.filter((doc) => doc.userId !== id)); // Use 'id' instead of 'userId'
      toast.success("Employee deleted successfully");
      setTimeout(async () => {
        await fetchData();
      }, 3000);
    } catch (error) {
      toast.error("Failed to delete document");
    }
  };
  

  const handleDeleteSelected = async () => {
    try {
      await deleteUser(selectedDocuments);
      const newFilteredDocuments = filteredDocuments.filter(
        (doc) => !selectedDocuments.includes(doc.id)
      );
      setFilteredDocuments(newFilteredDocuments);
      setSelectedDocuments([]);
      setCurrentPage(0);
    } catch (error) {
      console.error("Error deleting selected documents:", error);
      toast.error("Failed to delete selected documents");
    }
  };

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
  const handleRefreshClick=()=>{
    fetchData()
  }

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
                  <th>UserName</th>
                  <th>UserEmail</th>
                  <th>Mobile</th>
                  <th>Address</th>

                  <th>Actions</th>
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
                    <td data-label="userId">{doc.userId}</td>

                    <td data-label="firstName">{doc.firstName}</td>
                    <td data-label="email">{doc.email}</td>
                    <td data-label="mobile">{doc.mobile}</td>
                    <td data-label="mobile">{doc.address}</td>


                                       <td data-label="Action">
                      <div className="AdminAction-DataButon">
                        <button
                          className="AdminText-delete"
                          onClick={() =>
                            handleOpenConfirmationModal(doc.userId)
                          }
                        >
                          <IconMapper
                            iconName="Deletebtn"
                            className="AdminDeletebtnView"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      
        <div className="pagination-table-container">
         
          <div className="flex gap-3">
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
        </div>

        <ConfirmationModal
          open={showConfirmationModal}
          onClose={handleCloseConfirmationModal}
          onConfirm={handleConfirmDelete}
          title="Delete User"
          message="Are you sure you want to delete this User?"
        />
      </div>
      <ToastContainer
      style={{
        zIndex: 9999, // Set your desired z-index here
      }} />
    </div>
  );
};

export default AllEmployee;
