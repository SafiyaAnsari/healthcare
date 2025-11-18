import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import HealthInfo from './pages/HealthInfo';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useAuth } from './context/AuthContext';

const PrivateRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const AppLayout = () => (
  <div className="app-shell">
    <Sidebar />
    <div className="app-main">
      <Navbar />
      <div className="page-area">
        <Outlet />
      </div>
    </div>
  </div>
);

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<PrivateRoute />}>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/health-info" element={<HealthInfo />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;

