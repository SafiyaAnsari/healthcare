import { createContext, useContext, useEffect, useState } from 'react';
import api, { attachToken } from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ah_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ah_token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      localStorage.setItem('ah_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ah_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('ah_token', token);
      attachToken(token);
    } else {
      localStorage.removeItem('ah_token');
      attachToken('');
    }
  }, [token]);

  const handleAuth = (data) => {
    setUser({
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    });
    setToken(data.token);
    setError('');
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', credentials);
      handleAuth(data);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', payload);
      handleAuth(data);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    api.post('/auth/logout').catch(() => {});
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        authRequest: api,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

