import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import WellnessCard from '../components/WellnessCard';
import ReminderCard from '../components/ReminderCard';

const Dashboard = () => {
  const { authRequest, user } = useAuth();
  const [wellness, setWellness] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [tip, setTip] = useState('');
  const [wellnessForm, setWellnessForm] = useState({
    steps: '',
    sleep: '',
    activeMinutes: '',
  });
  const [reminderForm, setReminderForm] = useState({
    title: '',
    date: '',
  });
  const [message, setMessage] = useState('');

  const fetchAll = useCallback(async () => {
    try {
      const [{ data: wellnessData }, { data: reminderData }, { data: tipData }] =
        await Promise.all([
          authRequest.get('/wellness'),
          authRequest.get('/reminders'),
          authRequest.get('/wellness/tip/today'),
        ]);
      setWellness(wellnessData);
      setReminders(reminderData);
      setTip(tipData.tip);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to load data');
    }
  }, [authRequest]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleWellnessSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authRequest.post('/wellness', {
        steps: Number(wellnessForm.steps || 0),
        sleep: Number(wellnessForm.sleep || 0),
        activeMinutes: Number(wellnessForm.activeMinutes || 0),
      });
      setWellness([data, ...wellness]);
      setWellnessForm({ steps: '', sleep: '', activeMinutes: '' });
      setMessage('Wellness entry saved');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not save entry');
    }
  };

  const handleReminderSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authRequest.post('/reminders', reminderForm);
      setReminders([...reminders, data]);
      setReminderForm({ title: '', date: '' });
      setMessage('Reminder added');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not create reminder');
    }
  };

  const toggleReminder = async (reminder) => {
    try {
      const { data } = await authRequest.put(`/reminders/${reminder._id}`, {
        completed: !reminder.completed,
      });
      setReminders(
        reminders.map((item) => (item._id === reminder._id ? data : item))
      );
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to update reminder');
    }
  };

  const deleteReminder = async (id) => {
    try {
      await authRequest.delete(`/reminders/${id}`);
      setReminders(reminders.filter((reminder) => reminder._id !== id));
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to delete reminder');
    }
  };

  const latest = wellness[0] || { steps: 0, sleep: 0, activeMinutes: 0 };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Hi {user?.name}</h2>
          <p>Here is your wellbeing overview</p>
        </div>
        {tip && (
          <div className="tip-card">
            <p className="tip-label">Health tip of the day</p>
            <p>{tip}</p>
          </div>
        )}
      </div>

      {message && <p className="status-banner">{message}</p>}

      <section className="card-grid">
        <WellnessCard title="Steps" value={latest.steps} unit="steps" />
        <WellnessCard title="Sleep" value={latest.sleep} unit="hrs" />
        <WellnessCard
          title="Active Minutes"
          value={latest.activeMinutes}
          unit="min"
        />
      </section>

      <section className="forms-grid">
        <div className="panel">
          <h3>Log wellness data</h3>
          <form className="grid-form" onSubmit={handleWellnessSubmit}>
            <label>
              Steps
              <input
                type="number"
                value={wellnessForm.steps}
                onChange={(e) =>
                  setWellnessForm({ ...wellnessForm, steps: e.target.value })
                }
              />
            </label>
            <label>
              Sleep (hrs)
              <input
                type="number"
                value={wellnessForm.sleep}
                onChange={(e) =>
                  setWellnessForm({ ...wellnessForm, sleep: e.target.value })
                }
              />
            </label>
            <label>
              Active minutes
              <input
                type="number"
                value={wellnessForm.activeMinutes}
                onChange={(e) =>
                  setWellnessForm({
                    ...wellnessForm,
                    activeMinutes: e.target.value,
                  })
                }
              />
            </label>
            <button type="submit">Save entry</button>
          </form>
        </div>

        <div className="panel">
          <h3>Add reminder</h3>
          <form className="grid-form" onSubmit={handleReminderSubmit}>
            <label>
              Title
              <input
                type="text"
                value={reminderForm.title}
                onChange={(e) =>
                  setReminderForm({ ...reminderForm, title: e.target.value })
                }
                required
              />
            </label>
            <label>
              Date
              <input
                type="date"
                value={reminderForm.date}
                onChange={(e) =>
                  setReminderForm({ ...reminderForm, date: e.target.value })
                }
                required
              />
            </label>
            <button type="submit">Create reminder</button>
          </form>
        </div>
      </section>

      <section className="panel">
        <h3>Preventive reminders</h3>
        <div className="reminder-list">
          {reminders.length === 0 && <p>No reminders yet.</p>}
          {reminders.map((reminder) => (
            <ReminderCard
              key={reminder._id}
              reminder={reminder}
              onToggle={toggleReminder}
              onDelete={deleteReminder}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

