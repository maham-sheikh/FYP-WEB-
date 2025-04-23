import React, { useState } from 'react';
import './addcategory.css';

const AddCategory = ({ onAddCategory, onClose }) => {
  const [newCategory, setNewCategory] = useState({
    name: '',
    serviceId: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory.name && newCategory.serviceId) {
      onAddCategory(newCategory);
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
            <h3>Add New Category</h3>
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
                value={newCategory.name}
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
                value={newCategory.serviceId}
                onChange={handleInputChange}
                placeholder="Enter service ID"
                required
              />
            </div>
            <div className="modal-actions">
              <button type="submit">Add Category</button>
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

export default AddCategory;