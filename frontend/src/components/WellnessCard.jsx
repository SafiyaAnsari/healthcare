const cardStyle = {
  background: '#fff',
  borderRadius: '12px',
  padding: '1.2rem',
  flex: 1,
  minWidth: '180px',
  border: '1px solid #e2e8f0',
};

const labelStyle = {
  fontSize: '0.9rem',
  color: '#94a3b8',
};

const valueStyle = {
  fontSize: '2rem',
  margin: '0.2rem 0',
};

const WellnessCard = ({ title, value, unit }) => (
  <div style={cardStyle}>
    <p style={labelStyle}>{title}</p>
    <p style={valueStyle}>
      {value}
      <span style={{ fontSize: '1rem', marginLeft: '0.3rem' }}>{unit}</span>
    </p>
  </div>
);

export default WellnessCard;

