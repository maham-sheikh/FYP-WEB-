import React, { useState } from 'react';
import './adduser.css';

const AddUser = ({ onAddUser, onClose }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    cnic: '',
    role: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.role && newUser.phone && newUser.cnic) {
      onAddUser(newUser);
      onClose();
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Add New User</h3>
            <button onClick={onClose} className="close-button">
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                placeholder="Enter user name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder="Enter user email"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={newUser.phone}
                onChange={handleInputChange}
                placeholder="Enter user phone"
                required
              />
            </div>
            <div className="form-group">
              <label>CNIC</label>
              <input
                type="text"
                name="cnic"
                value={newUser.cnic}
                onChange={handleInputChange}
                placeholder="Enter user CNIC"
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Select role</option>
                <option value="Customer">Customer</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>
            <div className="modal-actions">
              <button type="submit">Add User</button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;