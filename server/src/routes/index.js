import express from 'express';
import healthRoutes from './health.routes.js';
import contactRoutes from './contact.routes.js';

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/contact', contactRoutes);

export default router;
