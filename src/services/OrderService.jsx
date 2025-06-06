const ORDER_API_URL = '/api/Order'; // Let op hoofdletter 'O' vanwege backend route

export const createOrder = async (tableName, cartItems) => {
    const tableId = parseInt(localStorage.getItem("tableId"), 10);
    if (!tableId) {
        throw new Error("Tafel-ID niet gevonden.");
    }

    const response = await fetch(`${ORDER_API_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tableId: tableId,
            items: cartItems.map(item => ({
                dishId: item.dishId || item.id,
                quantity: item.quantity
            }))
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fout bij bestelling: ${errorText}`);
    }

    return await response.json();
};
