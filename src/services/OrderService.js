const ORDER_API_URL = 'https://localhost:5068/api/order';
const TABLE_API_URL = 'https://localhost:5068/api/tables';

export const createOrder = async (tableName, cartItems) => {
    const tablesResponse = await fetch(TABLE_API_URL);
    if (!tablesResponse.ok) {
        throw new Error("Kan tafels niet ophalen.");
    }

    const tables = await tablesResponse.json();
    const table = tables.find(t => t.name === tableName);

    if (!table) {
        throw new Error("Tafel niet gevonden.");
    }

    const tableId = table.id;

    const response = await fetch(`${ORDER_API_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tableId,
            items: cartItems.map(item => ({
                dishId: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fout bij bestelling: ${errorText}`);
    }

    return await response.json();
};
