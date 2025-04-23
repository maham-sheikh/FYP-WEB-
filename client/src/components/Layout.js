import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './header';
import Footer from './Footer';

const Layout = ({ children, onSearch = () => {} }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      const isMobileSize = window.innerWidth < 768;
      if (!isMobileSize) {
        setSidebarOpen(true); 
      } else {
        setSidebarOpen(false); 
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className={`layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={handleToggleSidebar} />
      <div className="main-content">
        <Header onToggleSidebar={handleToggleSidebar} onSearch={onSearch} />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;