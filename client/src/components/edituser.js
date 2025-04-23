import React, { useState, useEffect } from 'react';
import './addcategory.css'; 

const EditUser = ({ onUpdateUser, onClose, initialData }) => {
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    phone: '',
    cnic: '',
    role: '',
  });

  useEffect(() => {
    if (initialData) {
      setEditedUser({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        cnic: initialData.cnic,
        role: initialData.role,
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedUser.name && editedUser.email && editedUser.role && editedUser.phone && editedUser.cnic) {
      onUpdateUser(editedUser);
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
            <h3>Edit User</h3>
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
                value={editedUser.name}
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
                value={editedUser.email}
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
                value={editedUser.phone}
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
                value={editedUser.cnic}
                onChange={handleInputChange}
                placeholder="Enter user CNIC"
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={editedUser.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Select role</option>
                <option value="Vendor">Vendor</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
            <div className="modal-actions">
              <button type="submit">Save Changes</button>
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

export default EditUser;