import express from 'express';
import fetch from 'node-fetch';
import createItem from '../../../../helpers/createItemHelper.js'; // src/helpers/
const router = express.Router();

router.get('/', (req, res) => {
    // Construct the GraphQL query
    const query = `query { boards (ids:[${process.env.RENTOVER_UNQUALIFIED_BOARD_ID}]) {items {name }}}`;
  
    // Send the query to monday.com
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
  
router.post('/', async (req, res) => {
    try {
        const result = await createItem(req.body, process.env.RENTOVER_UNQUALIFIED_BOARD_ID, process.env.RENTOVER_UNQUALIFIED_GROUP_NAME);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error.message}` 
        });
    }
});

export default router;