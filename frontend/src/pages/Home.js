import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Cloud-Based ERP Application</h1>
      <p>This is a simple ERP application for demonstration purposes.</p>
      <div className="buttons">
        <Link to="/login" className="button">Login</Link>
        <Link to="/register" className="button">Register</Link>
      </div>
    </div>
  );
}

export default Home; 