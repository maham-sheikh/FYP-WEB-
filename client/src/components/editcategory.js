import React, { useState, useEffect } from 'react';
import './addcategory.css';

const EditCategory = ({ onUpdateCategory, onClose, initialData }) => {
  const [editedCategory, setEditedCategory] = useState({
    name: '',
    serviceId: '',
  });

  useEffect(() => {
    if (initialData) {
      setEditedCategory({
        name: initialData.name,
        serviceId: initialData.serviceId,
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedCategory.name && editedCategory.serviceId) {
      onUpdateCategory(editedCategory);
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
            <h3>Edit Category</h3>
            <button onClick={onClose} className="close-button">
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Category Name</label>
              <input
                type="text"
                name="name"
                value={editedCategory.name}
                onChange={handleInputChange}
                placeholder="Enter category name"
                required
              />
            </div>
            <div className="form-group">
              <label>Service ID</label>
              <input
                type="number"
                name="serviceId"
                value={editedCategory.serviceId}
                onChange={handleInputChange}
                placeholder="Enter service ID"
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

export default EditCategory;