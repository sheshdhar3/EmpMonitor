const express = require('express');
const router = express.Router();

router.post('/heartbeat', (req, res) => {
  const { hostname, user } = req.body;

  if (!hostname || !user) {
    return res.status(400).json({ message: 'Missing hostname or user' });
  }

  console.log('Heartbeat received:', hostname, user);

  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;

