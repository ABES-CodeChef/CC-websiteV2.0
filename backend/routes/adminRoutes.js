import express from 'express';
const router = express.Router();
import {
  getDashboardStats,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllRegistrations,
  updateRegistrationStatus,
  updateRegistration,
  deleteRegistration
} from '../controllers/adminController.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

router.use(authenticateToken, isAdmin);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/registrations', getAllRegistrations);
router.put('/registrations/:id/status', updateRegistrationStatus);
router.put('/registrations/:id', updateRegistration);
router.delete('/registrations/:id', deleteRegistration);

// module.exports = router;
export default router;