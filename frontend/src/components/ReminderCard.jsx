const ReminderCard = ({ reminder, onToggle, onDelete }) => (
  <div style={styles.card}>
    <div>
      <p style={styles.title}>{reminder.title}</p>
      <p style={styles.date}>
        {new Date(reminder.date).toLocaleDateString()} ·{' '}
        {reminder.completed ? 'Done' : 'Upcoming'}
      </p>
    </div>
    <div style={styles.actions}>
      <button style={styles.secondary} onClick={() => onToggle(reminder)}>
        {reminder.completed ? 'Undo' : 'Complete'}
      </button>
      <button style={styles.danger} onClick={() => onDelete(reminder._id)}>
        Delete
      </button>
    </div>
  </div>
);

const styles = {
  card: {
    background: '#fff',
    borderRadius: '10px',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #e2e8f0',
  },
  title: {
    margin: 0,
    fontWeight: 600,
  },
  date: {
    margin: '0.2rem 0 0',
    color: '#64748b',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  secondary: {
    border: '1px solid #cbd5f5',
    background: '#eef2ff',
    borderRadius: '6px',
    padding: '0.4rem 0.8rem',
  },
  danger: {
    border: 'none',
    background: '#ef4444',
    color: '#fff',
    borderRadius: '6px',
    padding: '0.4rem 0.8rem',
  },
};

export default ReminderCard;

