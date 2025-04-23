import React from 'react';
import Layout from '../components/Layout';
import './Dashboard.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { FaUser, FaList, FaTasks, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaChartBar, FaComments, FaExclamationCircle } from 'react-icons/fa'; 

const Dashboard = () => {
    return (
        <Layout>
            <div className="dashboard-main">
                <div className="dashboard-header">
                    <h2>Dashboard</h2>
                    
                    
                </div>

                <div className="breadcrumb">Home / Admin / Dashboard</div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    {[
                        { title: "Today's Users", value: 11, change: "+3%", description: "than last week", icon: <FaUser className="icon user-icon" /> },
                        { title: "Total Services", value: 8, change: "0%", description: "no change from last month", icon: <FaList className="icon list-icon" /> },
                        { title: "Total Categories", value: 20, change: "+5%", description: "than last week", icon: <FaTasks className="icon tasks-icon" /> },
                        { title: "Verified Business", value: 4, change: "+2%", description: "than last week", icon: <FaCheckCircle className="icon check-icon" /> },
                        { title: "Unverified Business", value: 2, change: "-1%", description: "than last week", icon: <FaTimesCircle className="icon times-icon" /> },
                        { title: "Bookings", value: 2, change: "+5%", description: "than last month", icon: <FaCalendarAlt className="icon calendar-icon" /> },
                        { title: "Customer Feedback", value: 5, change: "+8%", description: "than last month", icon: <FaComments className="icon comments-icon" /> },
                        { title: "Business Feedback", value: 4, change: "+5%", description: "than last month", icon: <FaChartBar className="icon chart-icon" /> },
                        { title: "Complaints", value: 3, change: "-2%", description: "than last month", icon: <FaExclamationCircle className="icon exclamation-icon" /> },
                    ].map((stat, index) => (
                        <div key={index} className="stat-card">
                            <div className='stat-icon'>
                                {stat.icon}
                            </div>
                            <h3>{stat.title}</h3>
                            <p>{stat.value}</p>
                            <p className="stat-change" style={{ color: stat.change.startsWith('+') ? 'green' : 'red' }}>
                                {stat.change}
                            </p>
                            <p className="stat-description">{stat.description}</p>
                        </div>
                    ))}
                </div>
                {/* Charts */}
                  <div className="charts">
                    <div className="chart">
                      <h3>Daily User Growth Chart</h3>
                      <PieChart
                        series={[
                          {
                            data: [
                              { id: 0, value: 10, label: 'series A' },
                              { id: 1, value: 15, label: 'series B' },
                              { id: 2, value: 20, label: 'series C' },
                            ],
                          },
                        ]}
                        width={Math.min(window.innerWidth * 0.9, 400)} 
                        height={Math.min(window.innerWidth * 0.45, 200)} 
                      />
                    </div>
                    <div className="chart">
                      <h3>Business Growth Chart</h3>
                      <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                          {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                          },
                        ]}
                        width={Math.min(window.innerWidth * 0.9, 500)} 
                        height={Math.min(window.innerWidth * 0.6, 300)} 
                      />
                    </div>
                  </div>
                </div>
        </Layout>
    );
};

export default Dashboard;
