import express from 'express';
import { signup, verifyOTP, setPassword, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOTP);
router.post('/set-password', setPassword);
router.post('/login', login); // Added login route

export default router;