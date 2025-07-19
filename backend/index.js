import app from './src/utils/app.js';

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
});