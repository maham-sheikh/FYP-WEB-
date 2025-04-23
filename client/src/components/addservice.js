import React, { useState } from 'react';
import './addcategory.css'; 

const AddService = ({ onAddService, onClose }) => {
  const [newService, setNewService] = useState({
    name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newService.name) {
      onAddService(newService);
      onClose();
    } else {
      alert('Please fill out the service name.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Add New Service</h3>
            <button onClick={onClose} className="close-button">
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Service Name</label>
              <input
                type="text"
                name="name"
                value={newService.name}
                onChange={handleInputChange}
                placeholder="Enter service name"
                required
              />
            </div>
            <div className="modal-actions">
              <button type="submit">Add Service</button>
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

export default AddService;