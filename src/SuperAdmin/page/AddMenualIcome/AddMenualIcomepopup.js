import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { AddIcomeValidation } from "../../../utils/validationSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddMenualIcomepopup.css";
import { AddIncomeMenual, EditIncomeMenual } from "../../../pages/services/api";

const AddIncomePopup = ({ open, onClose, product, fetchDocuments }) => {
  const [formData, setFormData] = useState({
    productId: "",
    income: "",
    userId: "",
  });
  const [errors, setErrors] = useState({});

  // Update formData when a product is passed or popup is opened
  useEffect(() => {
    setFormData({
      productId: product?.productId || "",
      income: product?.income || "",
      userId: product?.userId || "",
    });
    setErrors({});
  }, [product, open]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Map formData to FormData object
  const mapToFormData = (data) => {
    const formDataToSend = new FormData();
    Object.keys(data).forEach((key) => {
      formDataToSend.append(key, data[key]);
    });
    return formDataToSend;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form data
      await AddIcomeValidation.validate(formData, { abortEarly: false });
      setErrors({});

      const formDataToSend = mapToFormData(formData);

      if (product) {
        await EditIncomeMenual(product.userId, formDataToSend);
        toast.success("Income updated successfully!");
      } else {
        await AddIncomeMenual(formDataToSend);
        toast.success("Income added successfully!");
      }

      setTimeout(async () => {
        onClose();
        await fetchDocuments();
      }, 1000);
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        toast.error("Please fill in the required fields.");
      } else if (err.response) {
        toast.error(err.response.data.error || "An unexpected error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: "dialog" }}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{product ? "Edit Product" : "Add Income"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            id="productId"
            name="productId"
            label="Product ID"
            value={formData.productId}
            onChange={handleChange}
            error={Boolean(errors.productId)}
            helperText={errors.productId}
          />
          <TextField
            fullWidth
            margin="dense"
            id="income"
            name="income"
            label="Income"
            value={formData.income}
            onChange={handleChange}
            error={Boolean(errors.income)}
            helperText={errors.income}
          />
          <TextField
            fullWidth
            margin="dense"
            id="userId"
            name="userId"
            label="User ID"
            value={formData.userId}
            onChange={handleChange}
            error={Boolean(errors.userId)}
            helperText={errors.userId}
          />
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

export default AddIncomePopup;
