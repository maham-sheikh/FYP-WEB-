import React, { useState, useEffect } from 'react';
import './addcategory.css'; 

const EditService = ({ onUpdateService, onClose, initialData }) => {
  const [editedService, setEditedService] = useState({
    name: '',
  });

  useEffect(() => {
    if (initialData) {
      setEditedService({
        name: initialData.name,
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedService.name) {
      onUpdateService(editedService);
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
            <h3>Edit Service</h3>
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
                value={editedService.name}
                onChange={handleInputChange}
                placeholder="Enter service name"
                required
              />
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

export default EditService;