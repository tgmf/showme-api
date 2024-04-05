/**
 * Creates an item on a given board and group on Monday.com.
 *
 * @param {Object} itemData - The data for the item to be created.
 * @param {number} board - The ID of the board where the item will be created.
 * @param {string} group - The ID of the group where the item will be created.
 * @returns {Object} - An object containing the success status and the ID of the created item.
 * @throws Will throw an error if the API request encounters any errors.
 */
async function createItem(itemData, board, group) {
    console.log("showmehub itemData: ", itemData);
    // Constructing the GraphQL mutation for creating an item.
    const mutation = `
        mutation {
            create_item (
                board_id: ${board},
                group_id: "${group}",
                item_name: "${itemData.name}",
                column_values: "${JSON.stringify(itemData).replace(/"/g, '\\"')}"
            ) {
                id
            }
        }`;
    
        console.log('mutation: ', mutation);
    // Making the API call to Monday.com to create the item.
    const response = await fetch("https://api.monday.com/v2", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.MONDAY_API_KEY
        },
        body: JSON.stringify({ query: mutation })
    });
  
    // Parsing the JSON response from the API call.
    const responseData = await response.json();
        
    // Checking if the API response contains any errors.
    if (responseData.errors) {
        throw new Error(JSON.stringify(responseData.errors));
    }
  
    // Returning the success status and the ID of the created item.
    return ({
        success: true,
        leadId: responseData.data.create_item.id
    });
}

export default createItem;