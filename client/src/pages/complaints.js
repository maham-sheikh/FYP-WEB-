import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import './complaints.css';

const Complaints = () => {
    return (
        <Layout>
            <div className="complaints-page">
                <div className="complaints-header">
                    <h2>Complaint</h2>
                </div>
                <div className="complaints-breadcrumb">
                    <span>Home / Admin / Complaint</span>
                </div>
                <div className="complaints-lists">
                <Link to="/complaints/resolved" className="complaints-list-link">Resolved Complaint</Link>
b               <Link to="/complaints/unresolved" className="complaints-list-link">Unresolved Complaint</Link>

                </div>
            </div>
        </Layout>
    );
};

export default Complaints;