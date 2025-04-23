import React, { useState } from 'react';
import Layout from '../components/Layout';
import './feedback.css';

const BusinessFeedback = () => {
    const businessFeedbackData = [
        { id: 1, businessID: 1, vendorID: 104, rating: "4.0", details: "Details" },
        { id: 2, businessID: 2, vendorID: 106, rating: "4.0", details: "Details" },
        { id: 3, businessID: 3, vendorID: 110, rating: "5.0", details: "Details" },
        { id: 4, businessID: 4, vendorID: 107, rating: "5.0", details: "Details" }
    ];


        const [searchTerm, setSearchTerm] = useState('');
        const [filteredFeedback, setFilteredBusiness] = useState(businessFeedbackData);
        const [currentPage, setCurrentPage] = useState(1);
        const [feedbackPerPage] = useState(5); 
        
        const handleSearch = (e) => {
            const term = e.target.value;
            setSearchTerm(term);
            const filtered = businessFeedbackData.filter((feedback) =>
                feedback.name.toLowerCase().includes(term.toLowerCase()) ||
                feedback.email.toLowerCase().includes(term.toLowerCase()) ||
                feedback.phone.includes(term)
            );
            setFilteredBusiness(filtered);
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
                    <h2>Business Feedback</h2>
                </div>
                <div className="feedback-breadcrumb">
                    <span>Home / Admin / Feedback / Business</span>
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

                <div className="business-table-container">
                <table className="feedback-table">
                    <thead>
                        <tr>
                        <th>Feedback ID</th>
                            <th>Business ID</th>
                            <th>Vendor ID</th>
                            <th>Overall Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentfeedback.map(feedback => (
                            <tr key={feedback.id}>
                                <td>{feedback.id}</td>
                                <td>{feedback.businessID}</td>
                                <td>{feedback.vendorID}</td>
                                <td>{feedback.rating}</td>
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

export default BusinessFeedback;
