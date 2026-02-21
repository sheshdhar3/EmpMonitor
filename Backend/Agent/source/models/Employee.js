const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  department: String,
  role: { type: String, default: 'employee' } // admin / employee
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
