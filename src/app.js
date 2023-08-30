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

const app = express();
app.use(express.json());

// endpoints for rentover tenants
app.use('/api/v1/rentover/tenants', rentoverTenantsRoutes);
// endpoints for rentover investors
app.use('/api/v1/rentover/investors', rentoverInvestorsRoutes);
// endpoints for rentover missed calls
app.use('/api/v1/rentover/missed', rentoverMissedRoutes);
// endpoints for rentover unqualified
app.use('/api/v1/rentover/unqualified', rentoverUnqualifiedRoutes);
// endpoints for showme classic leads
app.use('/api/v1/showme/classic', showMeClassicRoutes);
// endpoints for showme unqualified
app.use('/api/v1/showme/unqualified', showMeUnqualifiedRoutes);
// endpoints for showme missed calls
app.use('/api/v1/showme/missed', showMeMissedRoutes);
// endpoints for 100% brokers leads
app.use('/api/v1/100/brokers', BrokersRoutes);
// endpoints for new form leads
app.use('/api/v1/newform/main', newformMainRoutes);
// endpoints for new form unqualified
app.use('/api/v1/newform/unqualified', newformUnqualifiedRoutes);
// endpoints for new form missed calls
app.use('/api/v1/newform/missed', newformMissedRoutes);

// quick status check
app.get('/', (req, res) => {
    res.status(200).json({ status: 'Service is up' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});