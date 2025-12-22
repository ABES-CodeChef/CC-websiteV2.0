import express from 'express';
import contactController from '../controllers/contact.controller.js';
import { validateContactRequest } from '../middleware/validation.middleware.js';
import { asyncHandler } from '../middleware/error.middleware.js';
import { contactRateLimiter } from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

router.post(
  '/',
  contactRateLimiter,
  validateContactRequest,
  asyncHandler(contactController.submitContactForm.bind(contactController))
);

export default router;
