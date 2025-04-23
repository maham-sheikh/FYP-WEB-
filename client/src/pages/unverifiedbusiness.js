import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import './unverifiedbusiness.css';

const UnverifiedBusinesses = () => {
  const [unverifiedBusinessesData, setUnverifiedBusinessesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [businessesPerPage] = useState(5);

  useEffect(() => {
    const fetchUnverifiedBusinesses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/business/unverified');
        setUnverifiedBusinessesData(response.data);
        setFilteredBusinesses(response.data);
      } catch (error) {
        console.error('Error fetching unverified businesses:', error);
      }
    };

    fetchUnverifiedBusinesses();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = unverifiedBusinessesData.filter((business) =>
      business.fullName.toLowerCase().includes(term.toLowerCase()) ||
      business.email?.toLowerCase().includes(term.toLowerCase()) ||
      business.phone.includes(term) ||
      business.password.includes(term)
    );
    setFilteredBusinesses(filtered);
    setCurrentPage(1);
  };

  const handleApprove = async (businessId) => {
    try {
      await axios.put('http://localhost:8000/api/business/approve', { id: businessId });

      const updatedList = unverifiedBusinessesData.map((business) =>
        business.id === businessId ? { ...business, status: 'approved' } : business
      );

      setUnverifiedBusinessesData(updatedList.filter(business => business.status !== 'approved'));
      setFilteredBusinesses(updatedList.filter(business => business.status !== 'approved'));
    } catch (error) {
      console.error('Error approving business:', error);
    }
  };

  const handleReject = async (businessId) => {
    try {
      await axios.put('http://localhost:8000/api/business/reject', { id: businessId });

      const updatedList = unverifiedBusinessesData.map((business) =>
        business.id === businessId ? { ...business, status: 'rejected' } : business
      );

      setUnverifiedBusinessesData(updatedList);
      setFilteredBusinesses(updatedList);
    } catch (error) {
      console.error('Error rejecting business:', error);
    }
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
          <h2>Unverified Businesses</h2>
        </div>
        <div className="search-filter-section">
          <input
            type="text"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="business-table-container">
          <table className="business-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Postal Code</th>
                <th>City</th>
                <th>Password</th>
                <th>Business Category</th>
                <th>Sub Service</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBusinesses.map((business) => (
                <tr key={business.id}>
                  <td>{business.fullName}</td>
                  <td>{business.email || 'N/A'}</td>
                  <td>{business.phone}</td>
                  <td>{business.gender}</td>
                  <td>{business.address}</td>
                  <td>{business.postalCode}</td>
                  <td>{business.city}</td>
                  <td>{business.password}</td>
                  <td>{business.businessCategory}</td>
                  <td>{business.subService}</td>
                  <td>{business.status || 'Pending'}</td>
                  <td>
                    {business.status === 'pending' && (
                      <>
                        <button onClick={() => handleApprove(business.id)}>Approve</button>
                        <button onClick={() => handleReject(business.id)}>Reject</button>
                      </>
                    )}
                    {business.status === 'rejected' && 'Rejected'}
                    {business.status === 'approved' && 'Approved'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
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
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UnverifiedBusinesses;
