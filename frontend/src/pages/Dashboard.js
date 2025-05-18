import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // For demo purposes, just log the logout
    console.log('Logout clicked');
    // Navigate to home on logout
    navigate('/');
  };

  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <p>This is a simple dashboard for demonstration purposes.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard; 