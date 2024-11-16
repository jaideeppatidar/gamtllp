// import React from "react";
// import { Link } from "react-router-dom";
// import whatsappImage from "../../assect/images/QR-Geet-Agro.png";
// import whatsappIcon from "../../assect/images/whatsaap.png";
// export default function BankDetails() {
//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-12 col-md-6 text-center mb-4">
//           <div
//             className="card p-4 shadow-sm rounded"
//             style={{ backgroundColor: "#fff", border: "1px solid #ddd", maxWidth: "420px",
//             width: "100%", }} 
//           >
//             <div className="card-title mb-3">
//               <strong>Geet Agro Multitrade LLP Company</strong>
//             </div>
//             <img
//               src={whatsappImage}
//               alt="Scanner"
//               className="img-fluid"
//               style={{
//                 width: "100%",
//                 height:'70vh',
//                 objectFit: "contain",
//                 maxHeight: "410px", 
//               }}
//             />
//             <p className="mt-3 text-muted">Scan for verification</p>
//           </div>
//         </div>
//         <div className="col-12 col-md-6">
//         <div
//       className="d-flex justify-content-center align-items-center rounded "
//       style={{
//         background: "linear-gradient(180deg, #25D366, #128C7E)",
//         color: "white",
//         height:'70vh',
//         maxWidth: "420px",
//         width: "100%",
//       }}
//     >
//       <div
//         className="text-center p-4 bg-white rounded shadow"
//         style={{
//           maxWidth: "350px",
//           width: "100%",
//         }}
//       >
//         <div className="mb-4">
//           <img
//             src={whatsappIcon} 
//             alt="WhatsApp Logo"
//             className="img-fluid"
//             style={{ height: "80px", width: "80px" }}
//           />
//         </div>
//         <h2 className="text-success fw-bold">Welcome to WhatsApp</h2>
//         <p className="text-muted my-3" style={{ fontSize: "12px" }}>
//           Read our Privacy Policy. Tap "Agree & Continue" to accept the Terms of Service
//         </p>
//         <Link
//           to="https://wa.me/+917470513604"
         
//           className="btn btn-success w-100 rounded-pill"
//           style={{ fontSize: "16px", padding: "10px" }}
//         >
//           Agree & Continue
//         </Link>
//         <p className="text-muted mt-3" style={{ fontSize: "12px" }}>
//           From Facebook
//         </p>
//       </div>
//     </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Link } from "react-router-dom";
import whatsappImage from "../../assect/images/QR-Geet-Agro.png";
import whatsappIcon from "../../assect/images/whatsaap.png";

export default function BankDetails() {
  const [formData, setFormData] = useState({
    cardImage: null,
    date: "",
    amount: "",
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, cardImage: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* QR Scanner Section */}
        <div className="col-12 col-md-6 text-center mb-4">
          <div
            className="card p-4 shadow-sm rounded"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              maxWidth: "420px",
              width: "100%",
            }}
          >
            <div className="card-title mb-3">
              <strong>Geet Agro Multitrade LLP Company</strong>
            </div>
            <img
              src={whatsappImage}
              alt="Scanner"
              className="img-fluid"
              style={{
                width: "100%",
                height: "70vh",
                objectFit: "contain",
                maxHeight: "410px",
              }}
            />
            <p className="mt-3 text-muted">Scan for verification</p>
          </div>
        </div>

        {/* WhatsApp Section with Card Upload */}
        <div className="col-12 col-md-6">
          <div
            className="d-flex justify-content-center align-items-center rounded"
            style={{
              background: "linear-gradient(180deg, #25D366, #128C7E)",
              color: "white",
              height: "70vh",
              maxWidth: "420px",
              width: "100%",
            }}
          >
            <div
              className="text-center p-4 bg-white rounded shadow"
              style={{
                maxWidth: "350px",
                width: "100%",
              }}
            >
              <div className="mb-4">
                <img
                  src={whatsappIcon}
                  alt="WhatsApp Logo"
                  className="img-fluid"
                  style={{ height: "80px", width: "80px" }}
                />
              </div>
              <h2 className="text-success fw-bold">Welcome to WhatsApp</h2>
              <p className="text-muted my-3" style={{ fontSize: "12px" }}>
                Read our Privacy Policy. Tap "Agree & Continue" to accept the Terms of Service.
              </p>
           
              <p className="text-muted mt-3" style={{ fontSize: "12px" }}>
                From Facebook
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className=" mb-5 mt-4">
      <form onSubmit={handleSubmit}>
                {/* Card Upload */}
                <div className="mb-3 text-start">
                  <label htmlFor="cardImage" className="form-label">
                    Upload Card Image:
                  </label>
                  <input
                    type="file"
                    id="cardImage"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                </div>

                {/* Date Input */}
                <div className="mb-3 text-start">
                  <label htmlFor="date" className="form-label">
                    Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Amount Input */}
                <div className="mb-3 text-start">
                  <label htmlFor="amount" className="form-label">
                    Amount:
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    className="form-control"
                    placeholder="Enter Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 rounded-pill"
                  style={{ fontSize: "16px", padding: "10px" }}
                >
                  Submit
                </button>
              </form>
      </div>
    </div>
  );
}
