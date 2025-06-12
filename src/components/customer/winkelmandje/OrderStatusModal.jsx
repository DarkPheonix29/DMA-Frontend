import { useEffect, useState } from "react";

// Dummy data – vervang dit straks met een API-call
const DUMMY_ORDERS = [
    {
        orderId: 101,
        items: [
            { name: "Cheeseburger", quantity: 2, status: "In voorbereiding" },
            { name: "Cola", quantity: 1, status: "Geserveerd" },
        ],
    },
    {
        orderId: 102,
        items: [
            { name: "Pizza Margherita", quantity: 1, status: "Wacht op keuken" },
        ],
    },
];

// Status → kleur mapping
const statusColorMap = {
    "Geserveerd": "text-green-600",
    "In voorbereiding": "text-orange-500",
    "Wacht op keuken": "text-yellow-500",
    "Geannuleerd": "text-red-600",
};

const OrderStatusModal = ({ onClose }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simuleer laden met dummy data
        const timeout = setTimeout(() => {
            setOrders(DUMMY_ORDERS);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-md w-[90%] max-w-md p-5 relative">
                <button className="absolute top-2 right-4 text-2xl" onClick={onClose}>×</button>
                <h2 className="text-xl font-bold mb-4">Jouw bestellingen</h2>

                {loading ? (
                    <p>Even laden...</p>
                ) : orders.length === 0 ? (
                    <p>Geen bestellingen gevonden.</p>
                ) : (
                    <ul className="space-y-4">
                        {orders.map((order) => (
                            <li key={order.orderId} className="border-b pb-2">
                                <p className="font-semibold mb-1">Order #{order.orderId}</p>
                                <ul className="ml-4 text-sm space-y-1">
                                    {order.items.map((item, i) => {
                                        const color = statusColorMap[item.status] || "text-gray-600";
                                        return (
                                            <li key={i} className="flex justify-between items-center">
                                                <span>{item.name} × {item.quantity}</span>
                                                <span className={`italic ${color}`}>{item.status}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default OrderStatusModal;
