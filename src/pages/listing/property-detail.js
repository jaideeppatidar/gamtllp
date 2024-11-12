
import React, { useCallback, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "../../../node_modules/react-18-image-lightbox/style.css";

const IMAGE_BASE_URL = "http://localhost:8080/";

export default function PropertyDetails() {
  const [data, setData] = useState({});
  const [incomeInput, setIncomeInput] = useState("");
  const params = useParams();
  const productId = params.productId;
  const navigate = useNavigate();
  
  const { userId, firstName } = useSelector((state) => state.auth.user);  
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
      const productData = response.data.meetings[0];
      setData(productData);
      setIncomeInput(productData.Income);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [productId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const calculateIncome = () => {
    const Income = Number(incomeInput) || 0;
    const percentage = Number(data?.Persantage?.replace("%", "") || 0) / 100;
    const dailyIncome = Income * percentage;
    const monthlyIncome = dailyIncome * 30;
    const quarterlyIncome = dailyIncome * 90;
    const yearlyIncome = dailyIncome * 365;
    return { dailyIncome, monthlyIncome, quarterlyIncome, yearlyIncome };
  };

  const { dailyIncome, monthlyIncome, quarterlyIncome, yearlyIncome } = calculateIncome();

  const handleBookNow = async () => {
    const bookingData = {
      productId: data.productId,
      title: data.ProductName,
      description: data.Description,
      image: data.image,
      income: incomeInput,
      dailyIncome: dailyIncome.toFixed(2),
      ninetyDayIncome: quarterlyIncome.toFixed(2),
      threeSixtyFiveDayIncome: yearlyIncome.toFixed(2),
      totalIncome: monthlyIncome.toFixed(2),
      Persantage: data.Persantage,
      userId,
      firstName,
    };
    console.log(bookingData)
    
    try {
      await axios.post("http://localhost:8080/api/booking", bookingData);
      navigate(`/buy/${data.productId}`, { state: bookingData });
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <>
      <Navbar navClass="defaultscroll sticky" menuClass="navigation-menu nav-left" />
      <section className="section mt-5 pt-4">
        <div className="container-fluid mt-4 p-4 bg-light rounded-4 shadow-sm">
          <div className="row g-4">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img
                src={`${IMAGE_BASE_URL}${data?.image}`}
                className="img-fluid rounded-3 shadow-sm"
                alt="Product"
                style={{ width: "auto", height: "450px" }}
              />
            </div>
            <div className="col-md-6 d-flex flex-column p-4">
              <h2 className="mb-2 text-dark">
                {data?.ProductName || "Product not found"}
              </h2>
              <div className="col-lg-6 col-md-5 col-12">
                <div className="rounded-3 shadow bg-white sticky-bar p-4">
                  <h5 className="mb-3">Income Details:</h5>
                  <div className="mb-3">
                    <label htmlFor="incomeInput" className="form-label">Investment</label>
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
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="small text-muted">Percentage</span>
                      <span className="small">{data?.Persantage}</span>
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
                  <button className="btn btn-primary w-100 mt-3" onClick={handleBookNow}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
