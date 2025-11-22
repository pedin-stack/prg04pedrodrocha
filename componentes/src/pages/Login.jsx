import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCard from '../components/cards/LoginCard';
import '../assets/css/login.css'; 

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // redireciona via react-router para dashboard
    navigate('/dashboard');
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <LoginCard onLogin={handleLoginSuccess} />
    </div>
  );
};

export default Login;