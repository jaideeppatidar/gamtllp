// src/components/VerifyOTP.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyOTP } from '../services/api';
import { otpValidationSchema } from '../../utils/validationSchema';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VerifyOTP() {
  const { userId } = useParams();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await otpValidationSchema.validate({ otp });
      console.log('Submitting OTP:', otp, 'for userId:', userId);
      await verifyOTP(userId, otp);
      toast.success('OTP Verified! Redirecting to login...');
      navigate('/auth-login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="otp"
        placeholder="Enter OTP"
        value={otp}
        onChange={handleChange}
        maxLength={6}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Verify OTP</button>
      <ToastContainer />
    </form>
  );
}
