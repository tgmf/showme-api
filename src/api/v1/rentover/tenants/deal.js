// Import necessary libraries and helper functions.
import express from 'express';
import fetch from 'node-fetch';
import createItem from '../../../../helpers/createItemHelper.js';  // Helper function for creating an item on monday.com

// Initialize a new router instance.
const router = express.Router();

// Endpoint to fetch all deal details from monday.com.
router.get('/', (req, res) => {
    // Construct a GraphQL query to fetch items from a specific board.
    const query = `query { boards (ids:[${process.env.RENTOVER_TENANTS_DEALS_BOARD_ID}]) {items {name }}}`;
  
    // Send the query request to monday.com's API.
    fetch("https://api.monday.com/v2", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.MONDAY_API_KEY
      },
      body: JSON.stringify({ query: query })
    })
    .then(response => response.json())  // Convert the response to JSON.
    .then(data => res.json(data))       // Send the JSON response to the client.
    .catch(error => res.status(500).json({ error: error.message }));  // Handle fetch errors.
});

// Endpoint to create a new deal on monday.com.
router.post('/', async (req, res) => {
    try {
        // Use the helper function to create a new deal item.
        const result = await createItem(req.body, process.env.RENTOVER_TENANTS_DEALS_BOARD_ID, process.env.RENTOVER_TENANTS_DEALS_GROUP_NAME);
        
        // Send the result back to the client.
        res.json(result);
    } catch (error) {
        // Handle errors that occur during item creation.
        res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error.message}` 
        });
    }
});

// Export the router to be integrated into the main application.
export default router;