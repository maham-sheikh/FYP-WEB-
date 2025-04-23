import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import './feedback.css';

const Feedback = () => {
    return (
        <Layout>
            <div className="feedback-page">
                <div className="feedback-header">
                    <h2>feedback</h2>
                </div>
                <div className="feedback-breadcrumb">
                    <span>Home / Admin / Feedback</span>
                </div>
                <div className="feedback-lists">
                    <Link to="/feedback/customer" className="feedback-list-link">Customer Feedback</Link>
                    <Link to="/feedback/business" className="feedback-list-link">Business Feedback</Link>
                </div>
            </div>
        </Layout>
    );
};

export default Feedback;
