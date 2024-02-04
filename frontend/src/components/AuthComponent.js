// AuthComponent.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router';

function AuthComponent({ Component }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const isLogin = localStorage.getItem('isLogin') === 'true';
      setIsAuthenticated(isLogin);

      if (!isLogin && location.pathname !== '/register') {
        console.log('User not authenticated. Redirecting to signin page.');
        navigate('/');
      }
    };

    checkAuthentication();
  }, [navigate, location.pathname]); // Only re-run the effect when pathname changes

  return isAuthenticated || location.pathname === '/register' ? <Component /> : null;
}

AuthComponent.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default AuthComponent;
