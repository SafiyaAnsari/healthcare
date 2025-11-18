const articles = [
  {
    title: 'Move with intention',
    text: 'Short bursts of movement add up. Try 3 sets of 10 squats spread across the day.',
  },
  {
    title: 'Sleep hygiene basics',
    text: 'Dim screens 30 minutes before bed and keep a consistent wind-down routine.',
  },
  {
    title: 'Nutrition reminders',
    text: 'Aim for half of your plate to be colorful veggies or fruit to boost micronutrients.',
  },
];

const HealthInfo = () => (
  <div className="panel">
    <h2>Preventive care library</h2>
    <p className="muted-label">
      Bite-sized education that is easy to share with patients.
    </p>
    <div className="info-grid">
      {articles.map((article) => (
        <div key={article.title} className="info-card">
          <h3>{article.title}</h3>
          <p>{article.text}</p>
        </div>
      ))}
    </div>
  </div>
);

export default HealthInfo;

