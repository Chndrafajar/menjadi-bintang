import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    company: null,
    user: null,
    admin: null,
    token: '',
  });

  // Set header default
  axios.defaults.headers.common['Authorization'] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem('auth');
    if (data) {
      const parseData = JSON.parse(data);
      setAuth((prevAuth) => ({
        ...prevAuth,
        company: parseData.company,
        user: parseData.user,
        admin: parseData.admin,
        token: parseData.token,
      }));
    }
  }, []); // Empty dependency array ensures this effect runs only once

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
