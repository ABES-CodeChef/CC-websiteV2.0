import express from 'express';
const router = express.Router();
import {
  createRegistration,
  getUserRegistrations,
  getRegistrationById
} from '../controllers/registrationController.js';
import { authenticateToken } from '../middleware/auth.js';
import { uploadPayment, handleUploadError } from '../middleware/upload.js';
router.post('/', 
  authenticateToken, 
  (req, res, next) => {
    uploadPayment(req, res, (err) => {
      if (err) {
        return handleUploadError(err, req, res, next);
      }
      next();
    });
  },
  createRegistration
);

router.get('/', authenticateToken, getUserRegistrations);
router.get('/:id', authenticateToken, getRegistrationById);

// module.exports = router;
export default router;