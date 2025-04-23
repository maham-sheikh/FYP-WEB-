import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import EditCategory from '../components/editcategory';
import AddCategory from '../components/addcategory'; 
import './category.css';

const Category = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); 
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories');
      const data = await response.json();
      setCategoriesData(data);
      setFilteredCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = categoriesData.filter(
      (category) =>
        category.name.toLowerCase().includes(term.toLowerCase()) ||
        category.serviceId.toString().includes(term)
    );
    setFilteredCategories(filtered);
    setCurrentPage(1);
  };

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const handleEditCategory = (category) => {
    setEditingCategory(category); 
    setShowEditModal(true); 
  };

  const handleUpdateCategory = async (updatedCategory) => {
    try {
      const response = await fetch(`http://localhost:8000/api/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategory),
      });
      const data = await response.json();
      setCategoriesData((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id ? data : cat
        )
      );
      setFilteredCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id ? data : cat
        )
      );
      setEditingCategory(null); 
      setShowEditModal(false); 
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleAddCategory = async (newCategory) => {
    try {
      const response = await fetch('http://localhost:8000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });
      const data = await response.json();
      setCategoriesData((prev) => [...prev, data]);
      setFilteredCategories((prev) => [...prev, data]);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/categories/${id}`, {
        method: 'DELETE',
      });
      setCategoriesData((prev) => prev.filter((cat) => cat.id !== id));
      setFilteredCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Layout>
      <div className="categories-page">
        <div className="categories-header">
          <h2>Categories</h2>
        </div>

        <div className="categories-breadcrumb">
          <span>Home / Admin / Category</span>
          <button onClick={() => setShowAddModal(true)} className="add-category-button">
            Add New Category
          </button>
        </div>

        <div className="search-filter-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="categories-table-container">
          <table className="categories-table">
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Category Name</th>
                <th>Service ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.serviceId}</td>
                  <td>
                    <div className="actions-dropdown">
                      <button className="actions-button">&#8942;</button>
                      <div className="dropdown-content">
                        <button onClick={() => handleEditCategory(category)}>Edit</button>
                        <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                      </div>
                    </div>
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

        {showAddModal && (
          <AddCategory
            onAddCategory={handleAddCategory}
            onClose={() => setShowAddModal(false)}
          />
        )}

        {showEditModal && (
          <EditCategory
            onUpdateCategory={handleUpdateCategory}
            onClose={() => {
              setShowEditModal(false);
              setEditingCategory(null);
            }}
            initialData={editingCategory}
          />
        )}
      </div>
    </Layout>
  );
};

export default Category;