// Importing necessary libraries and helper functions.
import express from 'express';
import fetch from 'node-fetch';
import createItem from '../../../../helpers/createItemHelper.js'; // Helper function for creating an item on monday.com @ /src/helpers/

// Creating a new router instance.
const router = express.Router();

// Endpoint to get all lead details from monday.com.
router.get('/lead/', (req, res) => {
    // Construct the GraphQL query to fetch items from a specific board.
    const query = `query { boards (ids:[${process.env.BROKERS_LEADS_BOARD_ID}]) {items {name }}}`;
  
    // Send the query request to monday.com's API.
    fetch("https://api.monday.com/v2", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.MONDAY_API_KEY
      },
      body: JSON.stringify({ query: query })
    })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ error: error.message }));
});

// Endpoint to create a new lead on monday.com.
router.post('/', async (req, res) => {
    try {
        // Use the helper function to create a new lead item.
        const result = await createItem(req.body, process.env.BROKERS_LEADS_BOARD_ID, process.env.BROKERS_LEADS_GROUP_NAME);
       // Send the result back to the client.
       res.json(result);
    } catch (error) {
        // Handle errors during item creation.
        res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error.message}` 
        });
    }
});

// Exporting the router to be used in the main application.
export default router;