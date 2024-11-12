import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { AddDocumentValidation } from "../../../utils/validationSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./product.css"; 
import { AddProduct } from "../../../pages/services/api";

const AddDocumentPopup = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    ProductName: "",
    Description: "",
    Income: "",
    image: null,
    Persantage: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddDocumentValidation.validate(formData, { abortEarly: false });
      setErrors({});

      const formDataToSend = new FormData();
      formDataToSend.append("ProductName", formData.ProductName);
      formDataToSend.append("Description", formData.Description);
      formDataToSend.append("Income", formData.Income);
      formDataToSend.append("Persantage", formData.Persantage);
      formDataToSend.append("image", formData.image); // Append the image file

      const response = await AddProduct(formDataToSend); 
      console.log(response); 
      toast.success("Document sent successfully");
      setFormData({
        ProductName: "",
        Description: "",
        Income: "",
        image: null,
        Persantage: "",
      });
  
      onClose(); 
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        const errorMessage = err.response.data.error || "An unexpected error occurred";
        toast.error(errorMessage);
      } else if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        toast.error("Please fill in the required fields.");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: "dialog" }}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Document</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            id="ProductName"
            name="ProductName"
            label="Product Name"
            value={formData.ProductName}
            onChange={handleChange}
            error={Boolean(errors.ProductName)}
            helperText={errors.ProductName}
          />
          <TextField
            fullWidth
            margin="dense"
            id="Description"
            name="Description"
            label="Description"
            value={formData.Description}
            onChange={handleChange}
            error={Boolean(errors.Description)}
            helperText={errors.Description}
          />
          <TextField
            fullWidth
            margin="dense"
            id="Persantage"
            name="Persantage"
            label="Percentage"
            value={formData.Persantage}
            onChange={handleChange}
            error={Boolean(errors.Persantage)}
            helperText={errors.Persantage}
          />
          <TextField
            fullWidth
            margin="dense"
            id="Income"
            name="Income"
            label="Income"
            value={formData.Income}
            onChange={handleChange}
            error={Boolean(errors.Income)}
            helperText={errors.Income}
          />

          <input
            accept="image/*"
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            style={{ marginTop: "16px" }}
          />
          {errors.image && (
            <p className="error-text">{errors.image}</p>
          )}
        </DialogContent>

        <DialogActions>
          <button
            type="button"
            onClick={onClose}
            className="cancel-button-employee"
          >
            Cancel
          </button>
          <button type="submit" className="save-button-employee">
            Save
          </button>
        </DialogActions>
        <ToastContainer />
      </form>
    </Dialog>
  );
};

export default AddDocumentPopup;
