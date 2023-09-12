// Importing necessary libraries and helper functions.
import express from 'express';
import createItem from '../../../../helpers/createItemHelper.js'; // Helper function for creating an item on monday.com @ /src/helpers/

// Creating a new router instance.
const router = express.Router();

// Endpoint to create a new lead on monday.com.
router.post('/', async (req, res) => {
    try {
        // Use the helper function to create a new lead item.
        const result = await createItem(req.body, process.env.NEWFORM_MISSED_BOARD_ID, process.env.NEWFORM_MISSED_GROUP_NAME);
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