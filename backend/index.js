import app from './src/utils/app.js';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to the Scope Clone API');
}); 



app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
});