// Importing required modules and route modules.
import express from 'express';
import rentoverTenantsRoutes from './api/v1/rentover/tenants/index.js';
import rentoverInvestorsRoutes from './api/v1/rentover/investors/index.js';
import rentoverMissedRoutes from './api/v1/rentover/missed/index.js';
import rentoverUnqualifiedRoutes from './api/v1/rentover/unqualified/index.js';
import showMeClassicRoutes from './api/v1/showme/classic/index.js';
import showMeUnqualifiedRoutes from './api/v1/showme/unqualified/index.js';
import showMeMissedRoutes from './api/v1/showme/missed/index.js';
import newformMainRoutes from './api/v1/newform/main/index.js';
import newformUnqualifiedRoutes from './api/v1/newform/unqualified/index.js';
import newformMissedRoutes from './api/v1/newform/missed/index.js';
import BrokersRoutes from './api/v1/100/brokers/index.js';
// Initializing the express application.
const app = express();

// Enabling JSON body parsing middleware for incoming requests.
app.use(express.json());

// Registering routes for different API endpoints.

// Endpoints for rentover tenants
app.use('/api/v1/rentover/tenants', rentoverTenantsRoutes);
// Endpoints for rentover investors
app.use('/api/v1/rentover/investors', rentoverInvestorsRoutes);
// Endpoints for rentover missed calls
app.use('/api/v1/rentover/missed', rentoverMissedRoutes);
// Endpoints for rentover unqualified
app.use('/api/v1/rentover/unqualified', rentoverUnqualifiedRoutes);
// Endpoints for showme classic leads
app.use('/api/v1/showme/classic', showMeClassicRoutes);
// Endpoints for showme unqualified
app.use('/api/v1/showme/unqualified', showMeUnqualifiedRoutes);
// Endpoints for showme missed calls
app.use('/api/v1/showme/missed', showMeMissedRoutes);
// Endpoints for 100% brokers leads
app.use('/api/v1/100/brokers', BrokersRoutes);
// Endpoints for new form leads
app.use('/api/v1/newform/main', newformMainRoutes);
// Endpoints for new form unqualified
app.use('/api/v1/newform/unqualified', newformUnqualifiedRoutes);
// Endpoints for new form missed calls
app.use('/api/v1/newform/missed', newformMissedRoutes);

// Basic root endpoint for service health check.
app.get('/', (req, res) => {
  res.status(200).json({ status: 'Service is up' });
});

// Starting the server on the specified port or default to 3000.
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});