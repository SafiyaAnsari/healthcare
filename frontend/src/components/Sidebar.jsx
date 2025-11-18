import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <aside style={styles.sidebar}>
    <div style={styles.brand}>AH</div>
    <nav style={styles.nav}>
      <NavLink style={styles.link} to="/">
        Dashboard
      </NavLink>
      <NavLink style={styles.link} to="/profile">
        Profile
      </NavLink>
      <NavLink style={styles.link} to="/health-info">
        Health Info
      </NavLink>
    </nav>
  </aside>
);

const styles = {
  sidebar: {
    width: '220px',
    minHeight: '100vh',
    background: '#111827',
    color: '#fff',
    padding: '2rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  brand: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  link: ({ isActive }) => ({
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    color: '#e2e8f0',
    background: isActive ? '#2563eb' : 'transparent',
  }),
};

export default Sidebar;

