// Importing required modules and route modules.
import express from 'express';
import centralRouting from './api/v1/index.js';
// Use .env instead of app.yaml in a dev environment  
if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then(dotenv => dotenv.config());
}

// Initializing the express application.
const app = express();

// Enabling JSON body parsing middleware for incoming requests.
app.use(express.json());

// Router for API endpoints
app.use('/api/v1', centralRouting);

// Basic root endpoint for service health check.
app.get('/', (req, res) => {
  res.status(200).json({ status: 'Service is up' });
});

// Starting the server on the specified port or default to 3000.
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});