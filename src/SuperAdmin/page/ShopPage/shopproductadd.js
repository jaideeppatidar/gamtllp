import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { ShopProductValidation } from "../../../utils/validationSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./shopproductadd.css"; 
import { AddShopProduct, EditShopProduct } from "../../../pages/services/api";

const ShopProduct = ({ open, onClose, product ,fetchDocuments }) => {
  const [formData, setFormData] = useState({
    ProductName: "",
    Description: "",
    Income: "",
    image: null,
    Kilogram:""
   
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  useEffect(() => {
    if (product) {
      setFormData({
        ProductName: product.ProductName || "",
        Description: product.Description || "",
        Income: product.Income || "",
        image: null,
        Kilogram: product.Kilogram || "",
       
      });
    } else {
      setFormData({
        ProductName: "",
        Description: "",
        Income: "",
        image: null,
        Kilogram: "",
       
       
      });
    }
  }, [product, open]);  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ShopProductValidation.validate(formData, { abortEarly: false });
      setErrors({});

      const formDataToSend = new FormData();
      formDataToSend.append("ProductName", formData.ProductName);
      formDataToSend.append("Description", formData.Description);
      formDataToSend.append("Income", formData.Income);
      formDataToSend.append("Kilogram", formData.Kilogram);
      formDataToSend.append("image", formData.image); 


      if (product) {
        await EditShopProduct(product.productId, formDataToSend);
        toast.success("product updated successfully!");
      } else {
        await AddShopProduct(formDataToSend);
        toast.success("product added successfully!");
      }

      setTimeout(async () => {
        onClose();
        await fetchDocuments();
      }, 3000);
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
      <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>   
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
            id="Kilogram"
            name="Kilogram"
            label="Kilogram"
            value={formData.Kilogram}
            onChange={handleChange}
            error={Boolean(errors.Kilogram)}
            helperText={errors.Kilogram}
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

export default ShopProduct;
