import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, confirmPasswordReset } from 'firebase/auth'; // Import Firebase methods
import './ResetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // For extracting query parameters

  useEffect(() => {
    // Extract the reset code from the query params
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');
    
    if (!oobCode) {
      setError('Invalid reset code.');
    } else {
      console.log("Reset Code (oobCode):", oobCode);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');

    if (!oobCode) {
      setError('Invalid reset code.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const auth = getAuth();

    try {
      // Reset the password using Firebase's confirmPasswordReset
      await confirmPasswordReset(auth, oobCode, password);
      setMessage('Your password has been reset successfully.');
      setError('');

      // Delay navigation so the user sees the message
      setTimeout(() => {
        navigate('/'); // Redirect to home or login page
      }, 3000); // 3-second delay to allow the message to be seen
    } catch (error) {
      console.error("Error resetting password:", error);
      setError('Failed to reset password. Please try again.');
      setMessage('');
    }
  };


  return (
    <div className="reset-password-container">
      <div className="reset-password-image"></div>
      <div className="reset-password-form">
        <div className="reset-password-logo">
          <img src={logo} alt="Findigo Logo" />
        </div>
        <h2 className='reset'>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Reset Password</button>
        </form>
        <div className="login-footer">
          <p>© 2024 Findigo. All rights reserved.</p>
          <a href="/terms">Terms of Use</a> |{" "}
          <a href="/privacy">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
