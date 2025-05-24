import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [adminData, setAdminData] = useState({});
  const [stats, setStats] = useState({ userCount: 0, recentUsers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const adminName = localStorage.getItem('adminName') || 'Admin';

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        navigate('/admin/login');
        return;
      }
      
      try {
        const response = await axios.get('/api/admin/dashboard', {
          headers: { 'x-auth-token': token }
        });
        
        setAdminData(response.data.admin);
        setStats(response.data.stats);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        
        // Redirect to login if token is invalid
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminName');
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-profile">
          <span>Welcome, {adminName}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>
      
      {error && <div className="dashboard-error">{error}</div>}
      
      <div className="dashboard-content">
        <div className="stats-card">
          <h3>User Statistics</h3>
          <div className="stat-item">
            <span className="stat-label">Total Users:</span>
            <span className="stat-value">{stats.userCount}</span>
          </div>
        </div>
        
        <div className="recent-users-card">
          <h3>Recent Users</h3>
          {stats.recentUsers.length > 0 ? (
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Email/Phone</th>
                    <th>Login Method</th>
                    <th>Login Date</th>
                    <th>Login Time</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentUsers.map((user, index) => (
                    <tr key={index}>
                      <td>{user.email || user.phone || 'N/A'}</td>
                      <td>{user.loginMethod}</td>
                      <td>{user.loginDate}</td>
                      <td>{user.loginTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-data">No recent users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;