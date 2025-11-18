// shared helper for controller error handling
function handleServerError(res, label, error) {
  console.error(`${label}:`, error.message);
  return res.status(500).json({ message: 'Server error' });
}

// helper to decide whether to show patient or provider data
function buildOwnerFilter(req) {
  if (req.user.role === 'provider' && req.query.userId) {
    return { user: req.query.userId };
  }

  return { user: req.user._id };
}

module.exports = { handleServerError, buildOwnerFilter };

