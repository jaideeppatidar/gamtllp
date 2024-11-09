
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginSuccess } from "../../Redux/authSlice/authSlice";
import { setUser } from "../../Redux/authSlice/userSlice";
import bg3 from "../../assect/images/1.png";
 import logo from "../../assect/images/logo.png";
import { loginUser } from "../services/api";
import './auth_login.css'


export default function AuthLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isPopupVisible, setPopupVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        
        try {
          const { token, user } = await loginUser(email, password); // Use the service
          
          // Dispatch actions to update Redux state
          dispatch(loginSuccess({ token, user }));
          dispatch(setUser(user));
              localStorage.setItem("authToken", token);
            
             
                navigate("/");
          
        } catch (error) {
          if (error.response && error.response.data) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage("Something went wrong. Please try again.");
          }
        }
      };

    return (
        <section className="bg-home zoom-image d-flex align-items-center">
            <div className="bg-overlay image-wrap" style={{ backgroundImage: `url(${bg3})`, backgroundPosition: 'center' }}></div>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="p-4 bg-white rounded-3 shadow-md mx-auto w-100" style={{ maxWidth: '400px' }}>
                            <form onSubmit={handleSubmit}>
                                <Link to="/"><img src={logo} className="mb-4 d-block mx-auto" alt="" style={{width:'70px'}} /></Link>
                                <h5 className="mb-3">Please sign in</h5>

                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                                <div className="form-floating mb-2">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label text-muted" htmlFor="flexCheckDefault">Remember me</label>
                                        </div>
                                    </div>
                                    <span className="forgot-pass text-muted mb-0">
                                        <Link to="/auth-reset-password" className="text-muted">Forgot password ?</Link>
                                    </span>
                                </div>

                                <button className="btn btn-primary w-100" type="submit">Sign in</button>

                                <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted me-2">Don't have an account ?</span> <Link to="/auth-signup" className="text-dark fw-medium">Sign Up</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
           
                    </section>
    );
}
