const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

const app = express();

// basic middleware setup
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// simple health route
app.get('/', function (_req, res) {
  res.send('Wellness API is running');
});

// attach feature routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/wellness', require('./routes/wellnessRoutes'));
app.use('/api/reminders', require('./routes/reminderRoutes'));
app.use('/api/patient', require('./routes/patientRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/provider', require('./routes/providerRoutes'));

// last layer error handler
app.use(function (err, _req, res, _next) {
  console.error('Server error:', err.message);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});

