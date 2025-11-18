import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const PatientAppointments = () => {
  const { authRequest } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctor: '',
    dateTime: '',
    reason: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [{ data: appointmentsData }, { data: doctorData }] = await Promise.all([
          authRequest.get('/appointments/mine'),
          authRequest.get('/patient/doctors'),
        ]);
        setAppointments(appointmentsData);
        setDoctors(doctorData);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Unable to load appointments');
      }
    };
    loadData();
  }, [authRequest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authRequest.post('/appointments', form);
      setAppointments([...appointments, data]);
      setForm({ doctor: '', dateTime: '', reason: '' });
      setMessage('Appointment requested');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to request appointment');
    }
  };

  return (
    <div className="panel">
      <h2>Appointments</h2>
      {message && <p className="status-banner">{message}</p>}

      <div className="panel-subsection">
        <h3>Book a visit</h3>
        <form className="grid-form" onSubmit={handleSubmit}>
          <label>
            Doctor
            <select
              value={form.doctor}
              onChange={(e) => setForm({ ...form, doctor: e.target.value })}
              required
            >
              <option value="">Select a doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name} · {doc.email}
                </option>
              ))}
            </select>
          </label>
          <label>
            Date & time
            <input
              type="datetime-local"
              value={form.dateTime}
              onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
              required
            />
          </label>
          <label>
            Reason
            <textarea
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              rows={3}
            />
          </label>
          <button type="submit">Request appointment</button>
        </form>
      </div>

      <div className="panel-subsection">
        <h3>Upcoming visits</h3>
        {appointments.length === 0 && <p>No appointments yet.</p>}
        <div className="reminder-list">
          {appointments.map((appt) => (
            <div key={appt._id} className="mini-card">
              <p>{new Date(appt.dateTime).toLocaleString()}</p>
              <p className="muted-label">
                Doctor: {appt.doctor?.name || 'Unknown'} · Status: {appt.status}
              </p>
              {appt.reason && <p>{appt.reason}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;


