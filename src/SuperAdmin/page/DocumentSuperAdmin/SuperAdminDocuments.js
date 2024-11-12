import React, { useState, useEffect } from "react";
import "./SuperAdminDocuments.css";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import CommonHeader from "../../superadmincompo/CommonHeader/index";
import SuperAdminDocumentPopup from "./SuperAdminDocumentPopup";
import { getAllProducts } from "../../../pages/services/api";
const ITEMS_PER_PAGE = 6;


const AdminMyDocuments = () => {
  const [documentsData, setDocumentsData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ITEMS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      console.log(response);
      setDocumentsData(response.meetings);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false); 
    }
  };
  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    const filteredData = documentsData.filter((document) => {
      const matchesSearch = document.ProductName.toLowerCase().includes(
        searchQuery.toLowerCase()
      );
      const matchesStatus = statusFilter
        ? document.state === statusFilter
        : true;

      return matchesSearch && matchesStatus;
    });
    const newOffset = page * rowsPerPage;
    setCurrentItems(filteredData.slice(newOffset, newOffset + rowsPerPage));
  }, [searchQuery, page, rowsPerPage, documentsData, statusFilter]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectDocuments = (id) => {
    setSelectedDocuments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDocuments(currentItems.map((item) => item._id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleDelete = () => {
    const newDocumentsData = documentsData.filter(
      (document) => !selectedDocuments.includes(document._id)
    );
    setDocumentsData(newDocumentsData);
    setSelectedDocuments([]);
    setPage(0);
  };


  const handleAddClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFormSubmit = (data) => {
    console.log("Form Submitted", data);
    setIsPopupOpen(false);
  };
  const handleRefreshClick = () => {
    fetchDocuments();
  }

  return (
    <div>
      <div className="AdminDocument-table-container">
        <CommonHeader
          searchTerm={searchQuery}
          setSearchTerm={setSearchQuery}
          handleDeleteSelected={handleDelete}
          selectedPayslips={selectedDocuments}
          showIcons={{ plus: true, trash: true, rotate: true }}
          handleSelectAll={handleSelectAll}
          currentDocuments={currentItems}
          selectedDocuments={selectedDocuments}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
          showStatusFilter={true}
          handleAddClick={handleAddClick}
          showSearchFilter={true}
          handleRefreshClick={handleRefreshClick}
        />
        {loading ? (
          // <LinearIndeterminate />
          <p>Loading</p>
        ) : (
          <div className="AdminDocument-tablebody">
            <table className="AdminDocument-table-data">
              <thead>
                <tr>
                  <th style={{ padding: "5px" }}>
                    <Checkbox
                      checked={
                        selectedDocuments.length === currentItems.length &&
                        currentItems.length > 0
                      }
                      indeterminate={
                        selectedDocuments.length > 0 &&
                        selectedDocuments.length < currentItems.length
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>productId</th>
                  <th>Product Name</th>
                  <th>Income</th>
                  <th>Persantage</th>
                  <th>image</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((document) => (
                  <tr key={document._id}>
                    <td
                      style={{
                        padding: "5px",
                        textAlign: "left",
                      }}
                    >
                      <Checkbox
                        checked={selectedDocuments.includes(document._id)}
                        onChange={() => handleSelectDocuments(document._id)}
                      />
                    </td>
                    <td data-label="productId">{document.productId}</td>
                    <td data-label="ProductName">{document.ProductName}</td>
                    <td data-label="Income">{document.Income}</td>

                    <td data-label="Persantage">{document.Persantage}</td>
                    <td data-label="image">{document.image}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="AdminDocument-pagination-table-container">
              
              <TablePagination
                rowsPerPageOptions={[ITEMS_PER_PAGE, 10, 25]}
                component="div"
                count={documentsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </div>
          </div>
        )}{" "}
      </div>
      <SuperAdminDocumentPopup
        open={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default AdminMyDocuments;
