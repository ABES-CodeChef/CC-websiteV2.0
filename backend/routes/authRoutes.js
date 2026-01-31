import express from 'express';
const router = express.Router();
import { register, login, getCurrentUser } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getCurrentUser);

// module.exports = router;
export default router;