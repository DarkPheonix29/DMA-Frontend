import { useState } from "react";

const AddItemModal = ({ item, onClose, onAdd }) => {
    const [quantity, setQuantity] = useState(1);

    const decrease = () => setQuantity(prev => Math.max(1, prev - 1));
    const increase = () => setQuantity(prev => prev + 1);

    const handleAdd = () => {
        onAdd(item, quantity);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
            <div className="bg-pastelred-300 rounded-xl p-6 w-[90%] max-w-md shadow-lg relative">
                <button className="absolute top-2 right-4 text-xl" onClick={onClose}>×</button>

                <img src={item.image} alt={item.name} className="rounded-md mb-4 w-full h-40 object-cover" />

                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <p className="text-lg font-bold mb-4">€{item.price.toFixed(2)}</p>

                <div className="flex justify-center items-center gap-4 mb-6">
                    <button
                        onClick={decrease}
                        className="w-10 h-10 rounded-full bg-white shadow text-xl"
                    >−</button>
                    <span className="text-xl">{quantity}</span>
                    <button
                        onClick={increase}
                        className="w-10 h-10 rounded-full bg-white shadow text-xl"
                    >+</button>
                </div>

                <button
                    onClick={handleAdd}
                    className="bg-white text-black font-semibold py-2 w-full rounded-full shadow"
                >
                    ADD
                </button>
            </div>
        </div>
    );
};

export default AddItemModal;
