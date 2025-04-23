import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail, setPassword } from "../features/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./admin.css";
import loginimage from "../assets/background.png";
import logo from "../assets/logo.png";
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa"; 
import passwordicon from "../assets/password-icon.png";
import Emailicon from "../assets/email-icon.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    console.log("Email changed:", newEmail);
    dispatch(setEmail(newEmail));
    setEmailError(""); 
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    console.log("Password changed:", newPassword);
    dispatch(setPassword(newPassword));
    setPasswordError(""); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    setEmailError("");
    setPasswordError("");
  
    if (!email) {
      setEmailError("Please enter your email.");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.");
      return;
    }
  
    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }
  
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
  
    console.log("Login button clicked");
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User signed in:", userCredential.user);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        alert("Failed to login: Please check your credentials.");
      });
  };
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  return (
    <div className="main-layout-login">
      <div className='layout-login1'>
        <img src={loginimage} alt="Login" className="image-r1"/>
      </div>
      <div className='layout-r2'> 
        <div className='layout-r3'>
          <div className='main-layoutr1'>
            <div className='layout-r4'>
              <img src={logo} alt="FINDIGO" className="image-r2"/>
            </div>
            <div className='layout-r5'>
              <p className="r-content1">FINDIGO</p>
            </div>
            <div className='layout-r6'>
              <p className="r-content2">LOGIN</p>
            </div>
            <div className='layout-r7'>
              <div className='layout-L6'>
                <p className="login-info">Enter your username & password to login</p>
              </div>

              <div className='layout-r15'>
                <div className='layout-r16'>
                  <div className="input-containerR">
                    <img src={Emailicon} alt="Email-icon" className="image-r3"/>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      autoComplete="email"
                      className={`form-controlr1 ${emailError ? 'error-border' : ''}`}
                      placeholder="Email"
                    />
                    {email && ( 
                      isEmailValid ? (
                        <FaCheck className="check-icon" />
                      ) : (
                        <FaTimes className="cross-icon" />
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className='layout-r15'>
                <div className='layout-r16'>
                  <div className="input-containerR">
                    <img src={passwordicon} alt="Password-icon" className="image-r3"/>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      required
                      className={`form-controlr1 no-browser-icon ${passwordError ? 'error-border' : ''}`}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Password"
                    />
                    {password && (
                      passwordVisible ? (
                        <FaEyeSlash className="eye-icon" onClick={togglePasswordVisibility} />
                      ) : (
                        <FaEye className="eye-icon" onClick={togglePasswordVisibility} />
                      )
                    )}
                    {passwordError && <span className="input-error-message">{passwordError}</span>}
                  </div>
                </div>
              </div>

              <div className="actions">
                <label>
                  <input type="checkbox" name="remember" />
                  Keep me logged in
                </label>
                <Link to="/forgot-password" className="account">Forget Password?</Link>
              </div>

              <div className='layout-r17'>
                <button type="submit" className="submit-buttonr1" onClick={handleSubmit}>
                  LOGIN
                </button>
              </div>
            </div>
                <div className="layout-r8">
                        <div className="layout-r9">
                          <div className="layout-rr14">
                            <p class="rr-content3">
                              <span>Copyright by</span>
                              <span class="rr-content4"> FINDIGO </span>
                            </p>
                          </div>
                          <p className="rr-content3"> ©2024.All Rights Reserved</p>
                        </div>
                        <div className="layout-rr10">
                          <div className="layout-rr11">
                            <Link to="/terms" className="rr-content5">
                              Term of Use
                            </Link>
                          </div>
                          <div className="layout-rr12">
                            <p className="rr-content5"> |</p>
                          </div>
                          <div className="layout-rr13">
                            <Link to="/privacy" className="rr-content5">
                              Privacy Policy
                            </Link>
                          </div>
                        </div>
                      </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;