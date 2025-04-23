// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Views/admin";
import Logout from './pages/logout';
import TermsOfUse from "./Views/TermsOfUse";
import PrivacyPolicy from "./Views/PrivacyPolicy";
import ForgotPassword from "./Views/ForgotPassword";
import Dashboard from './pages/Dashboard';
import User from './pages/user';
import UserDetail from './pages/userdetail';
import Services from './pages/Services';
import Category from './pages/category';
import Booking from './pages/booking';
import Business from './pages/busniness';
import VerifiedBusinesses from './pages/verifiedbusniess';
import UnverifiedBusinesses from './pages/unverifiedbusiness';
import Feedback from './pages/feedback';
import CustomerFeedback from './pages/customerfeedback';
import BusinessFeedback from './pages/businessfeedback';
import Complaints from './pages/complaints';
import ComplaintsResolved from './pages/resolvedcomplaint';
import ComplaintsUnresolved from './pages/unresolvedcomplaint';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/user" element={<User />} /> 
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/Services" element={<Services />} /> 
          <Route path="/category" element={<Category />} /> 
          <Route path="/booking" element={<Booking />} />
          <Route path="/business" element={<Business />} />
        <Route path="/business/verified" element={<VerifiedBusinesses />} />
        <Route path="/business/unverified" element={<UnverifiedBusinesses />} /> 
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedback/customer" element={<CustomerFeedback />} />
        <Route path="/feedback/business" element={<BusinessFeedback />} /> 
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/complaints/resolved" element={<ComplaintsResolved />} />
        <Route path="/complaints/unresolved" element={<ComplaintsUnresolved />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
