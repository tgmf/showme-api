async function createItem(itemData, board, group) {
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
    
    const response = await fetch("https://api.monday.com/v2", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.MONDAY_API_KEY
        },
        body: JSON.stringify({ query: mutation })
    });
  
    const responseData = await response.json();
        
    if (responseData.errors) {
        throw new Error(JSON.stringify(responseData.errors));
    }
  
    return ({
        success: true,
        leadId: responseData.data.create_item.id
    });
}

export default createItem;