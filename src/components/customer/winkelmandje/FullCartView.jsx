import React, { useState } from "react";
import { createOrder } from "../../../services/OrderService";

const FullCartView = ({ items, onClose, onClearCart }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        if (items.length === 0) {
            setError("Je winkelmandje is leeg.");
            return;
        }

        const tableId = localStorage.getItem("tableId");
        if (!tableId) {
            setError("Tafel-ID niet gevonden. Scan opnieuw of open de juiste QR-code.");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const tableName = localStorage.getItem("tableName") || "Onbekende tafel";
            const response = await createOrder(tableName, items);
            alert(`Bestelling geplaatst! Ordernummer: ${response.orderId}`);
            onClearCart();
            onClose();
        } catch (error) {
            console.error(error);
            setError(error.message || "Er ging iets mis bij het plaatsen van de bestelling.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-pastelred-300 flex flex-col justify-between p-5">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => alert("Ober geroepen")} className="bg-white rounded-lg px-4 py-2 shadow">
                    🧑‍🍳 Roep de ober
                </button>
            </div>
            <div className="bg-white flex-1 rounded-lg shadow-md p-4 overflow-y-auto">
                <h2 className="text-center font-bold mb-2">
                    {localStorage.getItem("tableName") || "Tafel onbekend"}
                </h2>
                <hr className="border-pastelred-400 mb-4" />
                {error && <div className="bg-red-200 text-red-800 p-2 rounded mb-3 text-center">{error}</div>}
                {items.length === 0 ? (
                    <p className="text-center text-gray-500">Winkelmandje is leeg.</p>
                ) : (
                    items.map((item) => (
                        <div key={item.dishId || item.id} className="flex justify-between mb-2">
                            <span>{item.name} × {item.quantity}</span>
                            <span>€{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))
                )}
                <div className="flex justify-between font-semibold border-t pt-3 mt-4">
                    <span>IN TOTAAL</span>
                    <span>€{total.toFixed(2)}</span>
                </div>
            </div>
            <button onClick={handleCheckout} disabled={loading}
                    className="bg-pastelred-100 mt-5 text-xl font-semibold rounded-lg py-3 shadow disabled:opacity-50">
                {loading ? "Bestellen..." : "BESTEL"}
            </button>
            <button onClick={onClose} className="absolute top-2 right-4 text-2xl">×</button>
        </div>
    );
};

export default FullCartView;
