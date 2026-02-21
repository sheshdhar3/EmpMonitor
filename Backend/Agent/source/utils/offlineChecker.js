const Machine = require('../models/Machine');

const OFFLINE_AFTER_MS = 2 * 60 * 1000; // 2 minutes

async function markOfflineMachines() {
  const cutoff = new Date(Date.now() - OFFLINE_AFTER_MS);

  await Machine.updateMany(
    {
      lastSeen: { $lt: cutoff },
      status: 'Online'
    },
    {
      $set: { status: 'Offline' }
    }
  );
}

setInterval(markOfflineMachines, 30 * 1000); // every 30 seconds

module.exports = markOfflineMachines;
