import prisma from '../utils/prisma.js';
import { sendEmail } from '../mail/sendEmail.js';
import { randomInt } from 'crypto';

// Generate a 4-digit OTP
const generateOTP = () => randomInt(1000, 9999).toString();

// Signup and send OTP
export const signup = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });

    // Generate OTP and set expiration (5 minutes)
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    // Create user without specifying id (let Prisma handle it)
    await prisma.user.create({
      data: {
        email,
        otp,
        otpExpires,
        isVerified: false,
      },
    });

    // Send OTP via email
    await sendEmail(email, 'Your OTP for Verification', `Your OTP is: ${otp}. It expires in 5 minutes.`);
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Signup error:', error.message); // Log the error
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Verify OTP (unchanged)
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.otp !== otp || new Date() > user.otpExpires) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    await prisma.user.update({
      where: { email },
      data: { otp: null, otpExpires: null },
    });
    res.status(200).json({ message: 'OTP verified. Please set your password' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

// Set password (unchanged)
export const setPassword = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.isVerified) return res.status(400).json({ error: 'User not found or already verified' });

    await prisma.user.update({
      where: { email },
      data: { password, isVerified: true },
    });
    res.status(200).json({ message: 'Password set successfully. Account verified' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set password' });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isVerified || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};