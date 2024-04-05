// Import necessary modules and libraries
import express from 'express'; // Import express to handle routing
import fetch from 'node-fetch'; // Import fetch to make HTTP requests
import createItem from '../../helpers/createItemHelper.js'; // Import helper function to create an item
import boardConfig from '../../boardsConfig.js'; // Import the configuration for the boards

// Creating a new router instance.
const router = express.Router();

// Middleware to process incoming requests with path parameters 'project', 'type', and 'category'.
router.use('/:project/:type/:category/:itemId?', createCentralRouter);

// Middleware function to generate and attach a configuration for the incoming request.
function createCentralRouter (req, res, next) {
    console.log("showmehub use req.body:", req.body);
    // Extract path parameters from the request.
    const { project, type, category } = req.params;
    // Lookup the configuration for the given project, type, and category.
    const config = boardConfig[project][type][category];

    // Attach the required board ID and group name from the environment variables to the request.
    req.queryConfig = {
        boardId: process.env[config.BOARD_ID],
        groupName: process.env[config.GROUP_NAME]
    };

    // Pass control to the next middleware or route handler.
    next();
}
    
// Route to handle GET requests to fetch items based on the project, type, and category.
router.get('/:project/:type/:category/:itemId?', (req, res) => {
    const { queryConfig } = req;
    const itemIdFilter = req.params.itemId ? `(ids:[${req.params.itemId}])` : ''; // Optional item ID filter
    const query = `query {
        boards (ids:[${queryConfig.boardId}]) {
            items ${itemIdFilter} {
                name
                column_values {
                    id
                    text
                }
            }
        }
    }`;
    
    // Send the query request to monday.com's API.
    fetch("https://api.monday.com/v2", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.MONDAY_API_KEY
        },
        body: JSON.stringify({ query: query })
    })
    // Parse the response as JSON.
    .then(response => response.json())
    // Send the parsed data as the response to the client.
    .then(data => res.json(data))
    // Handle any errors that may arise during the fetch process.
    .catch(error => res.status(500).json({ error: error.message }));
});

// Route to handle POST requests to create items based on the project, type, and category.
router.post('/:project/:type/:category', async (req, res) => {
    console.log("showmehub post req.body:", req.body);
    // Extract the attached configuration from the request.
    const { queryConfig } = req;
    try {
        // Use the helper function to create a new item using the provided body and configuration.
        const result = await createItem(req.body, queryConfig.boardId, queryConfig.groupName);

        // Send the result back to the client.
        res.json(result);
    } catch (error) {
        // Handle any errors that may arise during the item creation process.
        res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error.message}` 
        });
    }
});

// Export the created router to be used in the main application.
export default router;