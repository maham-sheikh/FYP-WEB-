import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import './business.css';

const Business = () => {
    return (
        <Layout>
            <div className="business-page">
                <div className="business-header">
                    <h2>Business</h2>
                </div>
                <div className="business-breadcrumb">
                    <span>Home / Admin / Business</span>
                </div>
                <div className="business-lists">
                    <Link to="/business/verified" className="business-list-link">Verified Businesses</Link>
                    <Link to="/business/unverified" className="business-list-link">Unverified Businesses</Link>
                </div>
            </div>
        </Layout>
    );
};

export default Business;
