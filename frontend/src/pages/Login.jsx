import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, loading, error, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="auth-subtitle">Log in to see your wellness snapshot</p>
        {error && <p className="auth-error">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p>
          New to the platform? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

