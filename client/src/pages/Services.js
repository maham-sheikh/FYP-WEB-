import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AddService from '../components/addservice'; 
import EditService from '../components/editservice'; 
import './Services.css';

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(5);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/services');
      const data = await response.json();
      setServicesData(data);
      setFilteredServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = servicesData.filter((service) =>
      service.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredServices(filtered);
    setCurrentPage(1);
  };

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const handleAddService = async (newService) => {
    try {
      const response = await fetch('http://localhost:8000/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });
      const data = await response.json();
      setServicesData((prev) => [...prev, data]);
      setFilteredServices((prev) => [...prev, data]);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowEditModal(true);
  };

  const handleUpdateService = async (updatedService) => {
    try {
      const response = await fetch(`http://localhost:8000/api/services/${editingService.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedService),
      });
      const data = await response.json();
      setServicesData((prev) =>
        prev.map((service) =>
          service.id === editingService.id ? data : service
        )
      );
      setFilteredServices((prev) =>
        prev.map((service) =>
          service.id === editingService.id ? data : service
        )
      );
      setEditingService(null);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const deleteService = async (service) => {
    try {
      await fetch(`http://localhost:8000/api/services/${service.id}`, {
        method: 'DELETE',
      });
      const updatedServices = servicesData.filter((s) => s.id !== service.id);
      setServicesData(updatedServices);
      setFilteredServices(updatedServices);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <Layout>
      <div className="Services-page">
        <div className="Services-header">
          <h2>Services</h2>
        </div>
        <div className="Services-breadcrumb">
          <span>Home / Admin / Services</span>
          <button onClick={() => setShowAddModal(true)} className="add-service-button">
            Add New Service
          </button>
        </div>

        <div className="search-filter-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="Services-table-container">
          <table className="Services-table">
            <thead>
              <tr>
                <th>Service ID</th>
                <th>Service Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentServices.map((service) => (
                <tr key={service.id}>
                  <td>{service.id}</td>
                  <td>{service.name}</td>
                  <td>
                    <div className="actions-dropdown">
                      <button className="actions-button">...</button>
                      <div className="dropdown-content">
                        <button onClick={() => handleEditService(service)}>Edit</button>
                        <button onClick={() => deleteService(service)}>Delete</button>
                      </div>
                    </div>
                  </td>
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

        {showAddModal && (
          <AddService
            onAddService={handleAddService}
            onClose={() => setShowAddModal(false)}
          />
        )}

        {showEditModal && (
          <EditService
            onUpdateService={handleUpdateService}
            onClose={() => {
              setShowEditModal(false);
              setEditingService(null);
            }}
            initialData={editingService}
          />
        )}
      </div>
    </Layout>
  );
};

export default Services;