import React, { useState } from 'react';
import Layout from '../components/Layout';
import './feedback.css';

const CustomerFeedback = () => {
    const customerFeedbackData = [
        { id: 1, customerID: 102, vendorID: 204, rating: "3.4", date: "2022-09-13", details: "Details" },
        { id: 2, customerID: 105, vendorID: 205, rating: "4.2", date: "2022-09-14", details: "Details" },
        { id: 3, customerID: 103, vendorID: 207, rating: "5.0", date: "2022-09-10", details: "Details" },
        { id: 4, customerID: 106, vendorID: 210, rating: "4.5", date: "2022-09-15", details: "Details" }
    ];
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFeedback, setFilteredCustomer] = useState(customerFeedbackData);
    const [currentPage, setCurrentPage] = useState(1);
    const [feedbackPerPage] = useState(5); 
    
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = customerFeedbackData.filter((feedback) =>
            feedback.name.toLowerCase().includes(term.toLowerCase()) ||
            feedback.email.toLowerCase().includes(term.toLowerCase()) ||
            feedback.phone.includes(term)
        );
        setFilteredCustomer(filtered);
        setCurrentPage(1); 
      };
    
      const indexOfLastFeedback = currentPage * feedbackPerPage;
      const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage;
      const currentfeedback = filteredFeedback.slice(indexOfFirstFeedback, indexOfLastFeedback);
    
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
      const totalPages = Math.ceil(filteredFeedback.length / feedbackPerPage);

    return (
        <Layout>
              <div className="feedback-page">
                <div className="feedback-header">
                    <h2>Customer Feedback</h2>
                </div>
                <div className="feedback-breadcrumb">
                    <span>Home / Admin / Feedback / Customer</span>
                </div>
               
                <div className="search-filter-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search Customer Feedback..."
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
                                <td>{feedback.customerID}</td>
                                <td>{feedback.vendorID}</td>
                                <td>{feedback.rating}</td>
                                <td>{feedback.date}</td>
                                <td><button>{feedback.details}</button></td>
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

export default CustomerFeedback;