import React from 'react';
import { Button } from 'react-bootstrap';
// Good import (case-sensitive and consistent)
import { useAuth } from '../../context/AuthContext';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SocialLogin = ({ provider }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const getProviderIcon = () => {
    switch (provider) {
      case 'google': return <FaGoogle className="me-2" />;
      case 'github': return <FaGithub className="me-2" />;
      case 'facebook': return <FaFacebook className="me-2" />;
      default: return null;
    }
  };

  const getButtonVariant = () => {
    switch (provider) {
      case 'google': return 'outline-danger';
      case 'github': return 'dark';
      case 'facebook': return 'primary';
      default: return 'primary';
    }
  };

  return (
    <Button 
      variant={getButtonVariant()}
      onClick={handleLogin}
      className="d-flex align-items-center justify-content-center py-2"
      size="lg"
    >
      {getProviderIcon()}
      Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </Button>
  );
};

export default SocialLogin;