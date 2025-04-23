import React, { useState } from 'react';
import Layout from '../components/Layout';
import './complaints.css';

const ComplaintsUnresolved = () => {
    const unresolvedComplaints = [
        { id: 1, customerId: 112, vendorId: 107, date: '15-8-2024', issue: 'Installation delayed', action: 'Delete' },
        { id: 2, customerId: 108, vendorId: 106, date: '17-8-2024', issue: 'Misbehaved', action: 'Delete' }
    ];
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredComplaint, setFilteredComplaint] = useState(unresolvedComplaints); // Fixed here
    const [currentPage, setCurrentPage] = useState(1);
    const [complaintPerPage] = useState(5);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = unresolvedComplaints.filter((complaint) =>
            complaint.customerId.toString().includes(term) || // Search by Customer ID
            complaint.vendorId.toString().includes(term) ||  // Search by Vendor ID
            complaint.issue.toLowerCase().includes(term) ||  // Search by Issue
            complaint.date.toLowerCase().includes(term)      // Search by Date
        );
        setFilteredComplaint(filtered);
        setCurrentPage(1);
    };

    const indexOfLastComplaint = currentPage * complaintPerPage;
    const indexOfFirstComplaint = indexOfLastComplaint - complaintPerPage;
    const currentComplaint = filteredComplaint.slice(indexOfFirstComplaint, indexOfLastComplaint);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredComplaint.length / complaintPerPage);

    return (
        <Layout>
            <div className="complaints-page">
                <div className="complaints-header">
                    <h2>Unresolved Complaints</h2>
                </div>
                <div className="complaints-breadcrumb">
                    <span>Home / Admin / Complaints / Unresolved</span>
                </div>

                <div className="search-filter-section">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search complaints..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <div className="complaint-table-container">
                    <table className="complaints-table">
                        <thead>
                            <tr>
                                <th>Complaint ID</th>
                                <th>Customer ID</th>
                                <th>Vendor ID</th>
                                <th>Date</th>
                                <th>Issue</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentComplaint.map(complaint => (
                                <tr key={complaint.id}>
                                    <td>{complaint.id}</td>
                                    <td>{complaint.customerId}</td>
                                    <td>{complaint.vendorId}</td>
                                    <td>{complaint.date}</td>
                                    <td>{complaint.issue}</td>
                                    <td><button>{complaint.action}</button></td>
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

export default ComplaintsUnresolved;
