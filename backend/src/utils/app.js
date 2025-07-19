import express from 'express';
import dotenv from 'dotenv';
import prisma from './prisma.js';
import router from '../routes/router.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', router);

export default app;