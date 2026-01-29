import express from 'express';
const router = express.Router();
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import { uploadQRCode, handleUploadError } from '../middleware/upload.js';

router.get('/', getAllEvents);
router.get('/:id', getEventById);

router.post('/', 
  authenticateToken, 
  isAdmin, 
  (req, res, next) => {
    uploadQRCode(req, res, (err) => {
      if (err) {
        return handleUploadError(err, req, res, next);
      }
      next();
    });
  },
  createEvent
);

router.put('/:id', 
  authenticateToken, 
  isAdmin, 
  (req, res, next) => {
    uploadQRCode(req, res, (err) => {
      if (err) {
        return handleUploadError(err, req, res, next);
      }
      next();
    });
  },
  updateEvent
);

router.delete('/:id', authenticateToken, isAdmin, deleteEvent);

// module.exports = router;
export default router;