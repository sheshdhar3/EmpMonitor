const express = require('express');
const router = express.Router();
const Machine = require('../models/Machine');

router.post('/heartbeat', async (req, res) => {
  const { hostname, username, platform } = req.body;

  if (!hostname) {
    return res.status(400).json({ message: 'hostname required' });
  }

  const machine = await Machine.findOneAndUpdate(
    { hostname },
    {
      $set: {
        hostname,
        username,
        platform,
        lastSeen: new Date(),
        status: 'Online'
      }
    },
    { upsert: true, new: true }
  );

  res.json({ success: true, machine });
});

module.exports = router;
