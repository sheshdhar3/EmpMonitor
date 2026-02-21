const agentRoutes = require('./agent');
const dashboardRoutes = require('./dashboard');

module.exports = (app) => {
  app.use('/api/agent', agentRoutes);
  app.use('/api/dashboard', dashboardRoutes);
};
