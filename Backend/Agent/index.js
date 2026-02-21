
const markOfflineMachines = require('./source/utils/offlineChecker');

require('dotenv').config();

require('express-async-errors');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./source/utils/swagger/swagger.json');

const connectToMongoDB = require('./source/database/MongoConnection.js');
const initRoutes = require('./source/routes/routes.js');
const errorHandler = require('./source/utils/helper/errorHelper.js');

const initServer = async () => {
  try {
    // Connect DB
    await connectToMongoDB.connect();

    const app = express();

    // Health check (Docker / K8s)
    app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'ok',
        service: 'agent',
        uptime: process.uptime()
      });
    });

    const PORT = process.env.PORT || 5002;
    const publicFolderPath = path.resolve('public');

    // Middlewares
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(compression());

    // Static files
    app.use(express.static(publicFolderPath));

    // Keep-alive headers
    app.use((req, res, next) => {
      res.set({
        'Connection': 'keep-alive',
        'Keep-Alive': 'timeout=300',
      });
      next();
    });

    // Root test
    app.get('/', (req, res) => {
      res.status(200).json({ message: 'Success' });
    });

    // Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // ✅ ROUTES (FIXED)
    initRoutes(app);

  // ✅ Offline checker (runs every 30 seconds)
    setInterval(() => {
      markOfflineMachines();
   }, 30 * 1000);



    // Global error handler (MUST be last)
    app.use(errorHandler);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('Failed to initialize the server:', err);
    process.exit(1);
  }
};

initServer();

