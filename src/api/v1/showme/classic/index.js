import express from 'express';
import leadRoutes from './lead.js';
// import dealRoutes from './deal.js';

const router = express.Router();

router.use('/lead', leadRoutes);
// router.use('/deal', dealRoutes);

export default router;