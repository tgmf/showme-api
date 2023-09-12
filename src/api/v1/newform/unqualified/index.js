// Importing required modules and sub-routes for 'tenants'.
import express from 'express';
import leadRoutes from './lead.js';
// import dealRoutes from './deal.js';

// Initializing a new router instance.
const router = express.Router();

// Registering sub-routes under the 'tenants' route.

// Routes related to tenant leads.
router.use('/lead', leadRoutes);

// Routes related to tenant deals.
// router.use('/deal', dealRoutes);

// Exporting the combined router for usage in the main application.
export default router;