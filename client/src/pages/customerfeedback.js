import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import './feedback.css';

const CustomerReviews = () => {
  const [customerFeedbackData, setCustomerFeedbackData] = useState([]);
  const [filteredFeedback, setFilteredCustomer] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbackPerPage] = useState(5); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://192.168.18.244:8000/api/reviews');
        setCustomerFeedbackData(response.data);
        setFilteredCustomer(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = customerFeedbackData.filter((feedback) =>
      feedback.customerId.toString().includes(term) ||
      feedback.vendorId.toString().includes(term) ||
      feedback.rating.toString().includes(term)
    );
    setFilteredCustomer(filtered);
    setCurrentPage(1); 
  };

  const indexOfLastFeedback = currentPage * feedbackPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage;
  const currentfeedback = filteredFeedback.slice(indexOfFirstFeedback, indexOfLastFeedback);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredFeedback.length / feedbackPerPage);

  if (loading) return <Layout><div className="loading-message">Loading...</div></Layout>;
  if (error) return <Layout><div className="error-message">{error}</div></Layout>;

  return (
    <Layout>
      <div className="feedback-page">
        <div className="feedback-header">
          <h2>Customer Reviews</h2>
        </div>
        <div className="feedback-breadcrumb">
          <span>Home / Admin / Reviews / Customer</span>
        </div>

        <div className="search-filter-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="business-table-container">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Feedback ID</th>
                <th>Customer ID</th>
                <th>Vendor ID</th>
                <th>Overall Rating</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentfeedback.map(feedback => (
                <tr key={feedback.id}>
                  <td>{feedback.id}</td>
                  <td>{feedback.customerId}</td>
                  <td>{feedback.vendorId}</td>
                  <td>{feedback.rating}</td>
                  <td>{feedback.created_at?.split('T')[0]}</td> 
                  <td>
                    <button>View</button> 
                  </td>
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
      </div>
    </Layout>
  );
};

export default CustomerReviews;
