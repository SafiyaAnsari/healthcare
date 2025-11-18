import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={styles.nav}>
      <div>
        <h1 style={styles.title}>Atomic Wellness</h1>
        <p style={styles.subtitle}>Personalized health at a glance</p>
      </div>
      {user && (
        <div style={styles.userBlock}>
          <div>
            <strong>{user.name}</strong>
            <p style={styles.role}>{user.role}</p>
          </div>
          <button style={styles.button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    background: '#fff',
    borderBottom: '1px solid #e3e8ef',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
  },
  subtitle: {
    margin: '0.2rem 0 0',
    color: '#64748b',
  },
  userBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  role: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#94a3b8',
    textTransform: 'capitalize',
  },
  button: {
    border: 'none',
    background: '#2563eb',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
  },
};

export default Navbar;

