import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import './business.css';

const VerifiedBusinesses = () => {
  const [verifiedBusinessesData, setVerifiedBusinessesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [businessesPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerifiedBusinesses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/business/verified');
        setVerifiedBusinessesData(response.data);
        setFilteredBusinesses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching verified businesses:', error);
        setError('Failed to fetch verified businesses. Please try again later.');
        setLoading(false);
      }
    };

    fetchVerifiedBusinesses();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = verifiedBusinessesData.filter((business) =>
      business.fullName.toLowerCase().includes(term.toLowerCase()) ||
      business.email?.toLowerCase().includes(term.toLowerCase()) ||
      business.phone.includes(term) ||
      business.address.toLowerCase().includes(term.toLowerCase()) ||
      business.businessCategory.toLowerCase().includes(term.toLowerCase()) ||
      business.subService.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBusinesses(filtered);
    setCurrentPage(1);
  };


  const indexOfLastBusiness = currentPage * businessesPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
  const currentBusinesses = filteredBusinesses.slice(indexOfFirstBusiness, indexOfLastBusiness);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredBusinesses.length / businessesPerPage);

  return (
    <Layout>
      <div className="business-page">
        <div className="business-header">
          <h2>Verified Businesses</h2>
        </div>
        <div className="business-breadcrumb">
          <span>Home / Admin / Business / Verified</span>
        </div>

        <div className="search-filter-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search businesses..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="business-table-container">
              <table className="business-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    {/* <th>Password</th> */}
                    <th>Business Category</th>
                    <th>Sub Service</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBusinesses.map((business) => (
                    <tr key={business.id}>
                      <td>{business.fullName}</td>
                      <td>{business.email || 'N/A'}</td>
                      <td>{business.phone}</td>
                      <td>{business.address}</td>
                      {/* <td>{business.password}</td> */}
                      <td>{business.businessCategory}</td>
                      <td>{business.subService}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default VerifiedBusinesses;