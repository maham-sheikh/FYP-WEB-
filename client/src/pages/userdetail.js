import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import './user.css';

const users = [
    { id: 101, name: 'Jane Smith', email: 'jane.smith@example.com', cnic: '12345-6789012-4', phone: '555-555-5556', role: 'Vendor' },
    { id: 102, name: 'William Jack', email: 'williams.jack@gmail.com', phone: '03099660497', role: 'Customer' },
    { id: 103, name: 'Sara Wilson', email: 'sara.wilson@gmail.com', cnic: '56789-1234567-8', phone: '555-555-5557', role: 'Vendor' },
    { id: 104, name: 'Mike Johnson', email: 'mike.johnson@gmail.com', cnic: '98765-4321098-7', phone: '555-555-5558', role: 'Vendor' },
    { id: 105, name: 'Hailey John', email: 'hailey.john@gmail.com', phone: '03339880497', role: 'Customer' },
];

const UserDetail = () => {
    const { id } = useParams(); 
    const user = users.find(u => u.id.toString() === id); 

    if (!user) {
        return <h2>User not found</h2>;
    }

    return (
        <Layout>
            <div className="useradmin-page">
                <div className="useradmin-header">
                    <h2>User Detail</h2>
                </div>
                <div className="useradmin-breadcrumb">
                    <span>Home / Admin / User / Detail</span>
                </div>
                <table className="user-table-detail">
                    <thead>
                        <tr>
                            <th>Name</th>
                            {user.role === 'Vendor' ? <th>CNIC</th> : <th>Email</th>}
                            <th>Phone</th>
                            <th>Modify</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.name}</td>
                            {user.role === 'Vendor' ? <td>{user.cnic}</td> : <td>{user.email}</td>}
                            <td>{user.phone}</td>
                            <td>
                                <button className="modifybutton">Modify</button>
                            </td>
                            <td>
                                <button className="deletebutton">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="user-detail-date">
                    <p>Date: {new Date().toDateString()}</p>
                </div>
            </div>
        </Layout>
    );
};

export default UserDetail;
