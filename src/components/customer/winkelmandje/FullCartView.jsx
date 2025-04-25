const FullCartView = ({ items, onClose, onCheckout }) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="fixed inset-0 z-50 bg-pastelred-300 flex flex-col justify-between p-5">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => alert("Ober geroepen")} className="bg-white rounded-lg px-4 py-2 shadow">
                    🧑‍🍳 Roep de ober
                </button>
                <button onClick={() => alert("Naar afrekenen")} className="bg-pastelred-100 border px-4 py-2 rounded-lg shadow">
                    AFREKENEN
                </button>
            </div>

            <div className="bg-white flex-1 rounded-lg shadow-md p-4 overflow-y-auto">
                <h2 className="text-center font-bold mb-2">TAFEL 1</h2>
                <hr className="border-pastelred-400 mb-4" />
                {items.map((item) => (
                    <div key={item.id} className="flex justify-between mb-2">
                        <span>{item.name}</span>
                        <span>€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="flex justify-between font-semibold border-t pt-3 mt-4">
                    <span>IN TOTAAL</span>
                    <span>€{total.toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={() => alert("Bestelling geplaatst!")}
                className="bg-pastelred-100 mt-5 text-xl font-semibold rounded-lg py-3 shadow"
            >
                BESTEL
            </button>

            <button onClick={onClose} className="absolute top-2 right-4 text-2xl">×</button>
        </div>
    );
};

export default FullCartView;
