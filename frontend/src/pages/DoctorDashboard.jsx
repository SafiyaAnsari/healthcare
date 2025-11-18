import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const DoctorDashboard = () => {
  const { authRequest } = useAuth();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [wellness, setWellness] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const { data } = await authRequest.get('/provider/patients');
        setPatients(data);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Unable to load patients');
      }
    };
    loadPatients();
  }, [authRequest]);

  const selectPatient = async (patientId) => {
    setSelectedPatient(patientId);
    try {
      const [detailRes, wellnessRes, reminderRes] = await Promise.all([
        authRequest.get(`/provider/patient/${patientId}`),
        authRequest.get(`/wellness`, { params: { userId: patientId } }),
        authRequest.get(`/reminders`, { params: { userId: patientId } }),
      ]);
      setPatientDetails(detailRes.data);
      setWellness(wellnessRes.data);
      setReminders(reminderRes.data);
      setMessage('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to load patient data');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Doctor workspace</h2>
          <p>Review patients that selected you as their provider</p>
        </div>
      </div>

      {message && <p className="status-banner">{message}</p>}

      <section className="dual-grid">
        <div className="panel">
          <h3>Your patients</h3>
          {patients.length === 0 && <p>No patients assigned yet.</p>}
          <ul className="list">
            {patients.map((item) => (
              <li key={item.user._id}>
                <button
                  className={`list-button ${
                    selectedPatient === item.user._id ? 'active' : ''
                  }`}
                  onClick={() => selectPatient(item.user._id)}
                >
                  <span>{item.user.name}</span>
                  <small>{item.user.email}</small>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <h3>Patient details</h3>
          {!patientDetails && <p>Select a patient to view more data.</p>}
          {patientDetails && (
            <div>
              <p>
                <strong>{patientDetails.patient.name}</strong> ·{' '}
                {patientDetails.patient.email}
              </p>
              <p className="muted-label">
                Last updated:{' '}
                {new Date(patientDetails.profile.updatedAt).toLocaleString()}
              </p>
              <p>{patientDetails.profile.notes || 'No notes provided.'}</p>

              <div className="panel-subsection">
                <h4>Goals</h4>
                {patientDetails.goals.length === 0 && <p>No goals yet.</p>}
                {patientDetails.goals.map((goal) => (
                  <div key={goal._id} className="mini-card">
                    <p>
                      {new Date(goal.date).toLocaleDateString()} · Steps: {goal.steps} ·
                      Sleep: {goal.sleepHours}h · Water: {goal.waterLiters}L
                    </p>
                    <p className="muted-label">
                      Provider evaluation: {goal.providerEvaluation}
                    </p>
                  </div>
                ))}
              </div>

              <div className="panel-subsection">
                <h4>Recent wellness</h4>
                {wellness.length === 0 && <p>No data.</p>}
                {wellness.slice(0, 5).map((entry) => (
                  <div key={entry._id} className="mini-card">
                    <p>{new Date(entry.createdAt).toLocaleDateString()}</p>
                    <p>
                      Steps {entry.steps} · Sleep {entry.sleep}h · Active{' '}
                      {entry.activeMinutes}m
                    </p>
                  </div>
                ))}
              </div>

              <div className="panel-subsection">
                <h4>Reminders</h4>
                {reminders.length === 0 && <p>No reminders.</p>}
                {reminders.slice(0, 5).map((reminder) => (
                  <div key={reminder._id} className="mini-card">
                    <p>{reminder.title}</p>
                    <p className="muted-label">
                      {new Date(reminder.date).toLocaleDateString()} ·{' '}
                      {reminder.completed ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DoctorDashboard;


