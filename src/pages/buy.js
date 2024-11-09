import React, { useEffect, useState } from "react";
import bg2 from '../assect/images/5.png';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link, useNavigate } from "react-router-dom";
import { FiCamera, FiHeart, FiHome } from "react-icons/fi";

const IMAGE_BASE_URL = 'http://localhost:8080/';

export default function Buy() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const product = localStorage.getItem('selectedProduct');
            if (product) {
                setSelectedProduct(JSON.parse(product));
            }
        } catch (error) {
            console.error("Error parsing product data:", error);
        }
    }, []);

    const handleCheckoutClick = () => {
        navigate('/bank-details');
    };

    return (
        <>
            <Navbar navClass="defaultscroll sticky" logolight={true} menuClass="navigation-menu nav-left nav-light" />
            <section className="bg-half-170 d-table w-100" style={{ backgroundImage: `url(${bg2})` }}>
                <div className="bg-overlay bg-gradient-overlay-2"></div>
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12">
                            <div className="title-heading text-center">
                                <p className="text-white-50 para-desc mx-auto mb-0">Buy Products</p>
                                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Find Your Products</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container mt-100">
                {selectedProduct ? (
                    <div className="col-lg-4 col-md-6 col-12 mb-4">
                        <div className="card property border-0 shadow position-relative overflow-hidden rounded-3">
                            <div className="property-image position-relative overflow-hidden shadow">
                                <img 
                                  src={`${IMAGE_BASE_URL}${selectedProduct.image}`} 
                                  className="img-fluid"
                                  alt="Product"
                                />
                                <ul className="list-unstyled property-icon">
                                    <li><Link to="#" className="btn btn-sm btn-icon btn-pills btn-primary"><FiHome className="icons" /></Link></li>
                                    <li className="mt-1"><Link to="#" className="btn btn-sm btn-icon btn-pills btn-primary"><FiHeart className="icons" /></Link></li>
                                    <li className="mt-1"><Link to="#" className="btn btn-sm btn-icon btn-pills btn-primary"><FiCamera className="icons" /></Link></li>
                                </ul>
                            </div>
                            <div className="card-body content p-4">
                                <h5 className="title fs-5 text-dark fw-medium">{selectedProduct.title}</h5>
                                {selectedProduct.description && <p className="mt-2">{selectedProduct.description}</p>}
                                <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                                    <li className="list-inline-item mb-0">
                                        <span className="text-muted">Income</span>
                                        <p className="fw-medium mb-0">{selectedProduct.income}</p>
                                    </li>
                                    <li className="list-inline-item mb-0">
                                        <span className="text-muted">Daily Income</span>
                                        <p className="fw-medium mb-0">{selectedProduct.dailyIncome}</p>
                                    </li>
                                    <li className="list-inline-item mb-0">
                                        <span className="text-muted">Percentage</span>
                                        <p className="fw-medium mb-0">{selectedProduct.Persantage}</p>
                                    </li>
                                </ul>
                                <ul className="list-unstyled mt-3">
                                    <li className="list-inline-item mb-0">
                                        <span className="text-muted">90Day Income</span>
                                        <p className="fw-medium mb-0">{selectedProduct.ninetyDayIncome}</p>
                                    </li>
                                    <li className="list-inline-item mb-0">
                                        <span className="text-muted">365Day Income</span>
                                        <p className="fw-medium mb-0">{selectedProduct.threeSixtyFiveDayIncome}</p>
                                    </li>
                                    <li className="list-inline-item mb-0">
                                        <span className="text-muted">Total Income</span>
                                        <p className="fw-medium mb-0">{selectedProduct.totalIncome}</p>
                                    </li>
                                </ul>
                                <div className="d-flex justify-content-center mt-4">
                                    <button className="btn btn-primary" onClick={handleCheckoutClick}>Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No product selected. Please select a product to view details.</p>
                )}
            </div>
            <Footer />
        </>
    );
}
