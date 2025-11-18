import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { authRequest } = useAuth();
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await authRequest.get('/auth/me');
        setProfile(data);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Unable to load profile');
      }
    };
    fetchProfile();
  }, [authRequest]);

  if (!profile) {
    return (
      <div className="panel">
        <p>Loading profile...</p>
        {message && <p className="status-banner">{message}</p>}
      </div>
    );
  }

  return (
    <div className="panel">
      <h2>Your profile</h2>
      {message && <p className="status-banner">{message}</p>}
      <div className="profile-grid">
        <div>
          <p className="muted-label">Name</p>
          <p>{profile.name}</p>
        </div>
        <div>
          <p className="muted-label">Email</p>
          <p>{profile.email}</p>
        </div>
        <div>
          <p className="muted-label">Role</p>
          <p>{profile.role}</p>
        </div>
        <div>
          <p className="muted-label">Member since</p>
          <p>{new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <p className="muted-label">
        Providers can monitor multiple patients while patients can track their
        own metrics.
      </p>
    </div>
  );
};

export default Profile;

