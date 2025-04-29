import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import './complaints.css';

const ComplaintsUnresolved = () => {
  const [unresolvedComplaints, setUnresolvedComplaints] = useState([]);
  const [filteredComplaint, setFilteredComplaint] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUnresolvedComplaints = async () => {
      try {
        const response = await axios.get('http://192.168.18.244:8000/api/complaints/unverified');
        setUnresolvedComplaints(response.data);
        setFilteredComplaint(response.data);
      } catch (err) {
        console.error('Error fetching unresolved complaints:', err);
        setError('Failed to load complaints.');
      } finally {
        setLoading(false);
      }
    };

    fetchUnresolvedComplaints();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = unresolvedComplaints.filter((complaint) =>
      complaint.customerId.toString().includes(term) ||
      complaint.vendorId.toString().includes(term) ||
      complaint.message.toLowerCase().includes(term) ||
      (complaint.created_at && complaint.created_at.toLowerCase().includes(term))
    );
    setFilteredComplaint(filtered);
    setCurrentPage(1);
  };

  const handleResolve = async (id) => {
    try {
      await axios.put(`http://192.168.18.244:8000/api/complaints/resolve`, { complaintId: id });
      const updated = unresolvedComplaints.filter(c => c.id !== id);
      setUnresolvedComplaints(updated);
      setFilteredComplaint(updated);
      alert('Complaint resolved successfully!');
    } catch (error) {
      console.error('Error resolving complaint:', error);
      alert('Resolve failed.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.18.244:8000/api/complaints/delete/${id}`);
      const updated = unresolvedComplaints.filter(c => c.id !== id);
      setUnresolvedComplaints(updated);
      setFilteredComplaint(updated);
      alert('Complaint deleted successfully!');
    } catch (error) {
      console.error('Error deleting complaint:', error);
      alert('Delete failed.');
    }
  };

  const indexOfLastComplaint = currentPage * complaintPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintPerPage;
  const currentComplaint = filteredComplaint.slice(indexOfFirstComplaint, indexOfLastComplaint);
  const totalPages = Math.ceil(filteredComplaint.length / complaintPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Layout><div className="loading-message">Loading...</div></Layout>;
  if (error) return <Layout><div className="error-message">{error}</div></Layout>;

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentComplaint.map(complaint => (
                <tr key={complaint.id}>
                  <td>{complaint.id}</td>
                  <td>{complaint.customerId}</td>
                  <td>{complaint.vendorId}</td>
                  <td>{complaint.created_at?.split('T')[0]}</td>
                  <td>{complaint.message}</td>
                  <td>
                    <button onClick={() => handleResolve(complaint.id)}>Resolve</button>
                    <button onClick={() => handleDelete(complaint.id)} style={{ marginLeft: '5px' }}>
                      Delete
                    </button>
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

export default ComplaintsUnresolved;
