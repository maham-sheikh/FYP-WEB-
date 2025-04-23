import React, { useState, useEffect } from 'react';
import './header.css';
import { FaBars, FaSearch } from 'react-icons/fa';

const Header = ({ pageTitle, onToggleSidebar, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="header">
      {isMobile && (
        <div className="menu-icon" onClick={onToggleSidebar}>
          <FaBars className="toggle-icon" />
        </div>
      )}
      {!isMobile && ( 
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      )}
      <h2 className="page-title">{pageTitle}</h2>
      <div className="user-info">
        <div className="user-details">
          <p className="user-name">Maham Javed</p>
          <p className="user-email">mahisheikh64008@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Header;