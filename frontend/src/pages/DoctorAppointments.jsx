import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const statusOptions = ['pending', 'confirmed', 'completed', 'cancelled'];

const DoctorAppointments = () => {
  const { authRequest } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');

  const loadAppointments = useCallback(async () => {
    try {
      const { data } = await authRequest.get('/appointments/doctor');
      setAppointments(data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to load appointments');
    }
  }, [authRequest]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const updateStatus = async (id, status) => {
    try {
      await authRequest.put(`/appointments/${id}`, { status });
      setMessage('Appointment updated');
      loadAppointments();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to update appointment');
    }
  };

  return (
    <div className="panel">
      <h2>Your appointments</h2>
      {message && <p className="status-banner">{message}</p>}
      {appointments.length === 0 && <p>No appointments scheduled yet.</p>}
      <div className="reminder-list">
        {appointments.map((appt) => (
          <div key={appt._id} className="mini-card">
            <p>
              {new Date(appt.dateTime).toLocaleString()} · Patient:{' '}
              {appt.patient?.name}
            </p>
            {appt.reason && <p>{appt.reason}</p>}
            <div className="status-row">
              <span className="muted-label">Status: {appt.status}</span>
              <select
                value={appt.status}
                onChange={(e) => updateStatus(appt._id, e.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;


