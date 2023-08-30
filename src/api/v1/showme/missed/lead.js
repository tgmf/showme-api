import express from 'express';
import createItem from '../../../../helpers/createItemHelper.js'; // src/helpers/
const router = express.Router();

// create lead on missed call
router.post('/', async (req, res) => {
    try {
        const result = await createItem(req.body, process.env.SHOWME_MISSED_LEADS_BOARD_ID, process.env.SHOWME_MISSED_LEADS_GROUP_NAME);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error.message}` 
        });
    }
});

export default router;