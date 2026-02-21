const mongoose = require('mongoose');   // ✅ MISSING LINE (THIS IS THE FIX)

const MachineSchema = new mongoose.Schema(
  {
    hostname: { type: String, required: true },
    username: { type: String, required: true },
    platform: String,

    status: {
      type: String,
      enum: ['online', 'offline'],
      default: 'offline'
    },

    lastSeen: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Machine', MachineSchema);
