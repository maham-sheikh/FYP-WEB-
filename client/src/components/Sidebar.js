import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import log from "../assets/log.png";
import {
  FaThLarge,
  FaUser,
  FaCogs,
  FaList,
  FaBuilding,
  FaCommentDots,
  FaExclamationCircle,
  FaCalendarAlt,
  FaSignOutAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaUserAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isBusinessOpen, setBusinessOpen] = useState(false);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  const [isComplaintsOpen, setComplaintsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800 && !isSidebarOpen) {
        toggleSidebar(true); 
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen, toggleSidebar]);

  const handleDropdownClick = (dropdownSetter) => {
    dropdownSetter((prevState) => !prevState);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-logo">
        <img src={log} alt="Findigo Logo" />
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            <FaThLarge /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/user"
            className={location.pathname.startsWith("/user") ? "active" : ""}
          >
            <FaUser /> User
          </Link>
        </li>
        <li>
          <Link
            to="/services"
            className={location.pathname.startsWith("/services") ? "active" : ""}
          >
            <FaCogs /> Services
          </Link>
        </li>
        <li>
          <Link
            to="/category"
            className={location.pathname.startsWith("/category") ? "active" : ""}
          >
            <FaList /> Category
          </Link>
        </li>
        <li>
          <Link
            to="#!"
            onClick={() => handleDropdownClick(setBusinessOpen)}
            className={
              location.pathname.startsWith("/business") ? "active-group" : ""
            }
          >
            <FaBuilding /> Business {isBusinessOpen ? "▲" : "▼"}
          </Link>
          {isBusinessOpen && (
            <ul className="submenu">
              <li>
                <Link
                  to="/business/verified"
                  className={
                    location.pathname === "/business/verified" ? "active" : ""
                  }
                >
                  <FaCheckCircle /> Verified
                </Link>
              </li>
              <li>
                <Link
                  to="/business/unverified"
                  className={
                    location.pathname === "/business/unverified" ? "active" : ""
                  }
                >
                  <FaTimesCircle /> Unverified
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            to="/booking"
            className={location.pathname === "/booking" ? "active" : ""}
          >
            <FaCalendarAlt /> Booking
          </Link>
        </li>
        <li>
          <Link
            to="#!"
            onClick={() => handleDropdownClick(setFeedbackOpen)}
            className={isFeedbackOpen ? "active-group" : ""}
          >
            <FaCommentDots /> Feedback {isFeedbackOpen ? "▲" : "▼"}
          </Link>
          {isFeedbackOpen && (
            <ul className="submenu">
              <li>
                <Link
                  to="/feedback/customer"
                  className={
                    location.pathname === "/feedback/customer" ? "active" : ""
                  }
                >
                  <FaUserAlt /> Customer
                </Link>
              </li>
              <li>
                <Link
                  to="/feedback/business"
                  className={
                    location.pathname === "/feedback/business" ? "active" : ""
                  }
                >
                  <FaBuilding /> Business
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            to="#!"
            onClick={() => handleDropdownClick(setComplaintsOpen)}
            className={isComplaintsOpen ? "active-group" : ""}
          >
            <FaExclamationCircle /> Complaints {isComplaintsOpen ? "▲" : "▼"}
          </Link>
          {isComplaintsOpen && (
            <ul className="submenu">
              <li>
                <Link
                  to="/complaints/resolved"
                  className={
                    location.pathname === "/complaints/resolved" ? "active" : ""
                  }
                >
                  <FaCheckCircle /> Resolved
                </Link>
              </li>
              <li>
                <Link
                  to="/complaints/unresolved"
                  className={
                    location.pathname === "/complaints/unresolved"
                      ? "active"
                      : ""
                  }
                >
                  <FaTimesCircle /> Unresolved
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/logout">
            <FaSignOutAlt /> Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;