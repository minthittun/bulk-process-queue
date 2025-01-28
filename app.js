import express from 'express';
import smsRoutes from './routes/smsRoutes.js';

const app = express();
app.use(express.json());

app.use('/api', smsRoutes); // Use the routes for SMS

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
