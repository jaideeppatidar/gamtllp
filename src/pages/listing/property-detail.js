import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar";
import ProprtySlider from "../../components/propertySlider";
import "../../../node_modules/react-18-image-lightbox/style.css";
import Footer from "../../components/footer";
import  Faqs from '../faqs'
const IMAGE_BASE_URL = "http://localhost:8080/";

export default function PropertyDetails() {
  const [timeLeft, setTimeLeft] = useState(5 * 3600 + 20 * 60 + 56); // initial time in seconds (5 hours, 20 mins, 56 secs)

  const params = useParams();
  const id = params.id;

  const [data, setData] = useState(null);
  const [open, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [incomeInput, setIncomeInput] = useState("");
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup interval on component unmount
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs} hours ${mins} min ${secs} sec`;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/product");
        const productData = response.data.meetings.find(
          (item) => item._id === id
        );
        setData(productData);
        setIncomeInput(productData.Income);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const calculateIncome = () => {
    const Income = Number(incomeInput) || 0;
    const percentage = Number(data?.Persantage?.replace("%", "") || 0) / 100;
    const dailyIncome = Income * percentage;
    const monthlyIncome = dailyIncome * 30;
    const quarterlyIncome = dailyIncome * 90;
    const yearlyIncome = dailyIncome * 365;
    return { dailyIncome, monthlyIncome, quarterlyIncome, yearlyIncome };
  };
  const { dailyIncome, monthlyIncome, quarterlyIncome, yearlyIncome } =
    calculateIncome();

  const handleBookNow = (productData) => {
    const calculatedData = calculateIncome(); // Use your income calculation logic
    const data = {
      id: productData._id,
      title: productData.ProductName,
      description: productData.Description,
      image: productData.image,
      income: calculatedData.dailyIncome.toFixed(2),
      dailyIncome: calculatedData.dailyIncome.toFixed(2),
      ninetyDayIncome: calculatedData.quarterlyIncome.toFixed(2),
      threeSixtyFiveDayIncome: calculatedData.yearlyIncome.toFixed(2),
      totalIncome: calculatedData.monthlyIncome.toFixed(2),
      Persantage: productData.Persantage,
    };
    localStorage.setItem("selectedProduct", JSON.stringify(data));
  };

  return (
    <>
      <Navbar
        navClass="defaultscroll sticky"
        menuClass="navigation-menu nav-left"
      />
      <section className="section mt-5 pt-4">
        <div className="container-fluid mt-4 p-4 bg-light rounded-4 shadow-sm">
          <div className="row g-4">
            <div className="col-md-6 d-flex  align-items-center justify-content-center">
              <div className="d-flex  align-items-center justify-content-center">
                <Link
                  to="#"
                  onClick={() => handleImageClick(0)}
                  className="lightbox"
                  title=""
                >
                  <img
                    src={`${IMAGE_BASE_URL}${data?.image}`}
                    className="img-fluid rounded-3 shadow-sm"
                    alt="Product"
                    style={{ width: "auto", height: "450px" }}
                  />
                </Link>
              </div>
            </div>

            <div className="col-md-6 d-flex flex-column p-4">
              <h2 className="mb-2 text-dark">
                {data?.ProductName || "Product not found"}
              </h2>
              <p className="text-muted mb-3" style={{ fontSize: '25px' }}>
  {data?.Description || "Product not found"}
</p>


              <div className="d-flex align-items-center mb-2">
                <h4 className="text-success me-2">{incomeInput}</h4>
                <span className="text-decoration-line-through text-muted">
                  ₹2,999
                </span>
                <span className="text-danger ms-2">60% Off</span>
              </div>

              <div className="mb-3">
                <span className="badge bg-warning text-dark">
                  Sale Ending In:{" "}
                  {timeLeft > 0 ? formatTime(timeLeft) : "Sale Ended"}
                </span>
              </div>

              {/* Notification button */}
              <div className="mt-4">
                <button className="btn btn-dark btn-lg">Notify Me</button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row g-4">
            <div className="col-lg-8 col-md-7 col-12">
            <div className="container mt-100 mt-60">
                <Faqs/>
            </div>
            </div>

            <div className="col-lg-4 col-md-5 col-12">
              <div className="rounded-3 shadow bg-white sticky-bar p-4">
                <h5 className="mb-3">Income Details:</h5>

                {/* Income Input Field */}
                <div className="mb-3">
                  <label htmlFor="incomeInput" className="form-label">
                    Investment
                  </label>
                  <input
                    type="number"
                    id="incomeInput"
                    value={incomeInput}
                    onChange={(e) => setIncomeInput(e.target.value)}
                    className="form-control"
                    placeholder="₹0"
                  />
                </div>

                <div>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <span className="small text-muted">Percentage</span>
                    <span className="small">{data?.Persantage}</span>{" "}
                    {/* Use Percentage */}
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <span className="small text-muted">Daily Income</span>
                    <span className="small">₹{dailyIncome.toFixed(2)}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <span className="small text-muted">30 Days Income</span>
                    <span className="small">₹{monthlyIncome.toFixed(2)}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <span className="small text-muted">90 Days Income</span>
                    <span className="small">₹{quarterlyIncome.toFixed(2)}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <span className="small text-muted">365 Days Income</span>
                    <span className="small">₹{yearlyIncome.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  to="#"
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => handleBookNow(data)}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row justify-content-center">
            <div className="col">
              <div className="section-title text-center mb-4 pb-2">
                <h4 className="title mb-3">Related Properties</h4>
                <p className="text-muted para-desc mb-0 mx-auto">
                  A great platform to buy, sell and rent your properties without
                  any agent or commissions.
                </p>
              </div>
            </div>
          </div>

          <ProprtySlider />
        </div>
      </section>
      <Footer />
    </>
  );
}
