const express = require('express');
const router = express.Router();
const agentController = require('./agent.controller');

router.post('/heartbeat', agentController.heartbeat);

module.exports = router;

