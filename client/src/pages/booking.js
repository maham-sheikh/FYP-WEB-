import React, { useState } from 'react';
import Layout from '../components/Layout';
import './booking.css';

const Booking = () => {
  const bookingData = [
    { id: 1, customerId: 108, vendorId: 104, categoryId: 9, serviceName: "Household Services", status: "Completed" },
    { id: 2, customerId: 112, vendorId: 107, categoryId: 10, serviceName: "Tech Repair Services", status: "Pending" },
    { id: 3, customerId: 105, vendorId: 106, categoryId: 2, serviceName: "Household Services", status: "Completed" },
    { id: 4, customerId: 108, vendorId: 107, categoryId: 10, serviceName: "Tech Repair Services", status: "Completed" },
    { id: 5, customerId: 105, vendorId: 110, categoryId: 11, serviceName: "Auto Service and Maintenance", status: "Completed" },
    { id: 6, customerId: 108, vendorId: 106, categoryId: 2, serviceName: "Household Services", status: "Completed" },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState(bookingData);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5); 

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = bookingData.filter((booking) =>
      booking.serviceName.toLowerCase().includes(term.toLowerCase()) ||
      booking.customerId.toString().includes(term) ||
      booking.vendorId.toString().includes(term) ||
      booking.status.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBookings(filtered);
    setCurrentPage(1); 
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  return (
    <Layout>
      <div className="booking-page">
        <div className="booking-header">
          <h2>Booking</h2>
        </div>
        <div className="booking-breadcrumb">
          <span>Home / Admin / Booking</span>
        </div>

        <div className="search-filter-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="booking-table-container">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer ID</th>
                <th>Vendor ID</th>
                <th>Category ID</th>
                <th>Service Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.customerId}</td>
                  <td>{booking.vendorId}</td>
                  <td>{booking.categoryId}</td>
                  <td>{booking.serviceName}</td>
                  <td>{booking.status}</td>
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

export default Booking;