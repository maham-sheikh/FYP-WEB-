import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "./ForgotPassword.css";
import ForgetPassword1 from "../assets/background.png";
import logo from "../assets/logo.png";
import Emailicon from "../assets/email-icon.png";
import { FaCheckCircle } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send password reset email using Firebase Authentication
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "If an account with this email exists, a reset link has been sent."
      );
      setError("");

      // Optionally navigate after informing the user
      alert("Check your email for the reset link.");
      setTimeout(() => {
        navigate("/");
      }, 5000); // Navigate after 3 seconds
    } catch (error) {
      console.error("Error sending reset email:", error);
      setError(
        "Failed to send reset link. Please check your email address and try again."
      );
      setMessage("");
    }
  };

  return (
    <div className="main-layout-f">
      <div className="layout-f1">
        <img src={ForgetPassword1} alt="Login" className="image-1" />
      </div>
      <div className="layout-f2">
        <div className="layout-f3">
          <div className="main-layout1">
            <div className="layout-f4">
              <img src={logo} alt="FINDIGO" className="image-2" />
            </div>
            <div className="layout-f5">
              <p className="f-content1">FINDIGO</p>
            </div>
            <div className="layout-f6">
              <p className="f-content2">Forgot Password</p>
            </div>
            <div className="layout-f7">
              <div className="layout-f15">
                <form onSubmit={handleSubmit}>
                  <p className="r-content6">Enter your Email:</p>
                  <div className="layout-f16">
                    <div className="input-containerR">
                      <img
                        src={Emailicon}
                        alt="Email-icon"
                        className="image-r3"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="email-input"
                      />
                      <FaCheckCircle className="tick-icon" />
                    </div>
                  </div>
                  <button type="submit" className="reset-button">
                    Send Reset Link
                  </button>
                  {message && <p className="success-message">{message}</p>}
                  {error && <p className="error-message">{error}</p>}
                </form>
              </div>
            </div>
          </div>
          <div className="layout-f8">
            <div className="layout-f9">
              <div className="layout-f14">
                <p class="f-content3">
                  <span>Copyright by</span>
                  <span class="f-content4"> FINDIGO </span>
                </p>
              </div>
              <p className="f-content3">©2024.All Rights Reserved</p>
            </div>
            <div className="layout-f10">
              <div className="layout-f11">
                <Link to="/terms" className="f-content5">
                  Term of Use
                </Link>
              </div>
              <div className="layout-f12">
                <p className="f-content5"> |</p>
              </div>
              <div className="layout-f13">
                <Link to="/privacy" className="f-content5">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
