import React from "react";
import { createOrder } from "../../../services/OrderService"; // of jouw juiste pad

const FullCartView = ({ items, setCartItems, onClose, onCheckout, onClearCart }) => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tableName = localStorage.getItem("tableName") || "Tafel onbekend";

    const updateQuantity = (dishId, newQty) => {
        if (newQty <= 0) {
            removeItem(dishId);
            return;
        }

        const updated = items.map(item =>
            item.dishId === dishId ? { ...item, quantity: newQty } : item
        );
        sessionStorage.setItem("cartItems", JSON.stringify(updated));
        setCartItems(updated);
    };

    const removeItem = (dishId) => {
        if (!window.confirm("Weet je zeker dat je dit item wilt verwijderen?")) return;
        const updated = items.filter(item => item.dishId !== dishId);
        sessionStorage.setItem("cartItems", JSON.stringify(updated));
        setCartItems(updated);
    };

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
            {/* Header met ober-knop en afrekenen + sluitknoppen rechts */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => alert("Ober geroepen")}
                    className="bg-white rounded-lg px-4 py-2 shadow"
                >
                    🧑‍🍳 Roep de ober
                </button>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => alert("Naar afrekenen")}
                        className="bg-pastelred-100 border px-4 py-2 rounded-lg shadow"
                    >
                        AFREKENEN
                    </button>
                    <button
                        onClick={onClose}
                        aria-label="Sluiten"
                        className="text-2xl bg-white w-9 h-9 flex items-center justify-center rounded-full shadow hover:bg-red-100 transition"
                    >
                        &times;
                    </button>
                </div>
            </div>

            {/* Inhoud van de bestelling */}
            <div className="bg-white flex-1 rounded-lg shadow-md p-4 overflow-y-auto">
                <h2 className="text-center font-bold mb-2">{tableName.toUpperCase()}</h2>
                <hr className="border-pastelred-400 mb-4" />

                {items.length === 0 ? (
                    <p className="text-center text-gray-500">Winkelmandje is leeg.</p>
                ) : (
                    items.map((item) => (
                        <div key={item.dishId} className="flex justify-between items-center mb-2">
                            <div>
                                <span className="font-semibold">{item.name}</span><br />
                                <span className="text-sm text-gray-500">€{item.price.toFixed(2)} p/st</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => updateQuantity(item.dishId, item.quantity - 1)}
                                    className="w-8 h-8 rounded-full bg-white text-black border text-xl"
                                >
                                    −
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.dishId, item.quantity + 1)}
                                    className="w-8 h-8 rounded-full bg-white text-black border text-xl"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => removeItem(item.dishId)}
                                    className="text-red-500 text-lg ml-2"
                                    title="Verwijder"
                                >
                                    🗑
                                </button>
                            </div>
                        </div>
                    ))
                )}

                <div className="flex justify-between font-semibold border-t pt-3 mt-4">
                    <span>IN TOTAAL</span>
                    <span>€{total.toFixed(2)}</span>
                </div>
            </div>

            {/* Bestelknop onderaan */}
            <button
                onClick={handleCheckout}
                disabled={loading}
                className="bg-pastelred-100 mt-5 text-xl font-semibold rounded-lg py-3 shadow disabled:opacity-50"
            >
                {loading ? "Verwerken..." : "BESTEL"}
            </button>

            {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        </div>
    );
};

export default FullCartView;
