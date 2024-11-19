import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../node_modules/react-18-image-lightbox/style.css";
import { ProductBookingApi, fetchProductId } from "../services/api";

const IMAGE_BASE_URL = "http://13.60.219.5:8080/";
export default function PropertyDetails() {
  const [data, setData] = useState({});
  const [incomeInput, setIncomeInput] = useState("");
  const params = useParams();
  const productId = params.productId;
  const navigate = useNavigate();

  const { userId, firstName } = useSelector((state) => state.auth.user);
  const fetchData = useCallback(async () => {
    try {
      const response = await fetchProductId(productId);
      const productData = response.meetings[0];
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
    const totalIncome = dailyIncome * data?.Months * 30; 
    return { dailyIncome, totalIncome };
  };
  const { dailyIncome, totalIncome } = calculateIncome();

  const handleBookNow = async () => {
    const bookingData = {
      productId: data.productId,
      title: data.ProductName,
      image: data.image,
      income: incomeInput,
      dailyIncome: (dailyIncome || 0).toFixed(2),
      Persantage: data.Persantage,
      totalIncome: (totalIncome || 0).toFixed(2),
      Months:data.Months ,
      userId,
      firstName,
    };
    console.log(bookingData);
  
    try {
      await ProductBookingApi(bookingData);
      fetchData();
      navigate(`/buy/${data.productId}`);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };
  

  return (
    <>
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
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="small text-muted">Percentage</span>
                      <span className="small">{data?.Persantage}</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <span className="small text-muted">Daily Income</span>
                      <span className="small">₹{dailyIncome.toFixed(2)}</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <span className="small text-muted">
                        Total Income ({data.Months}Months)
                      </span>
                      <span className="small">₹{totalIncome.toFixed(2)}</span>
                    </div>
                  </div>
                  <Link
                    to={`/buy/${data.productId}`}
                    className="btn btn-primary w-100 mt-3"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
