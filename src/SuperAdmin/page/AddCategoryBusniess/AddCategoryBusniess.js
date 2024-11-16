import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { AddCategoryBusniess } from "../../../utils/validationSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddCategoryBusniess.css";
import { AddBusinessCategories } from "../../../pages/services/api";

const AddCategoryBusnies = ({ open, onClose, fetchDocuments }) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
    categoryImage: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // Correctly handle file input
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddCategoryBusniess.validate(formData, { abortEarly: false });
      setErrors({});

      const formDataToSend = new FormData();
      formDataToSend.append("categoryName", formData.categoryName);
      formDataToSend.append(
        "categoryDescription",
        formData.categoryDescription
      );

      formDataToSend.append("categoryImage", formData.categoryImage);
      console.log("FormData entries:");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value); // Log all FormData entries
      }
      const response = await AddBusinessCategories(formDataToSend);
      console.log(response);
      toast.success("AddCategoryBusniess sent successfully");
      setFormData({
        categoryName: "",
        categoryDescription: "",
        categoryImage: null,
      });
      fetchDocuments();
      onClose();
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        const errorMessage =
          err.response.data.error || "An unexpected error occurred";
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
        <DialogTitle>Add New Busniess Category </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            id="categoryName"
            name="categoryName"
            label="Product Name"
            value={formData.categoryName}
            onChange={handleChange}
            error={Boolean(errors.categoryName)}
            helperText={errors.categoryName}
          />
          <TextField
            fullWidth
            margin="dense"
            id="categoryDescription"
            name="categoryDescription"
            label="categoryDescription"
            value={formData.categoryDescription}
            onChange={handleChange}
            error={Boolean(errors.categoryDescription)}
            helperText={errors.categoryDescription}
          />

          <input
            accept="image/*"
            type="file"
            id="categoryImage"
            name="categoryImage"
            onChange={handleChange}
            style={{ marginTop: "16px" }}
          />

          {errors.image && <p className="error-text">{errors.image}</p>}
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

export default AddCategoryBusnies;
