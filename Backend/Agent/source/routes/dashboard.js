const express = require('express');
const router = express.Router();
const Machine = require('../models/Machine');

router.get('/machines', async (req, res) => {
  const machines = await Machine.find().lean();

  const OFFLINE_AFTER_MS = 2 * 60 * 1000; // 2 minutes

  const updatedMachines = machines.map(machine => {
    const isOnline =
      Date.now() - new Date(machine.lastSeen).getTime() < OFFLINE_AFTER_MS;

    return {
      ...machine,
      status: isOnline ? 'Online' : 'Offline'
    };
  });

  res.json(updatedMachines);
});

module.exports = router;
