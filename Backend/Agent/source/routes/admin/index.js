const express = require('express');
const router = express.Router();

/**
 * Agent heartbeat
 */
router.post('/agent/heartbeat', (req, res) => {
  const { hostname, user } = req.body;

  if (!hostname || !user) {
    return res.status(400).json({
      success: false,
      message: 'hostname and user are required'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Heartbeat received',
    data: { hostname, user }
  });
});

module.exports = router;

