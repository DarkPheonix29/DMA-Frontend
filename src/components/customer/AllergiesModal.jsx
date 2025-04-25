import { useState } from "react";
const allergies = [
    { id: 1, name: "Gluten", icon: "🌾" },
    { id: 2, name: "Noten", icon: "🥜" },
    { id: 3, name: "Melk", icon: "🥛" },
    { id: 4, name: "Schaaldieren", icon: "🦐" }
];

const AllergiesModal = ({ onClose }) => {
    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);
        setTimeout(onClose, 100);
    }

    return (
        <div className={`fixed inset-0 flex justify-center items-center z-50 ${closing ? "animate-fade-out" : "animate-fade-in"}`}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-opacity-30 backdrop-blur-md" onClick={handleClose}></div>

            {/* Modal Box */}
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 z-50">
                <h2 className="text-xl font-semibold mb-4">Allergieën</h2>

                {/* Allergie Lijst */}
                <ul className="space-y-2">
                    {allergies.map((allergy) => (
                        <li key={allergy.id} className="flex items-center gap-2">
                            <span className="text-lg">{allergy.icon}</span>
                            <span className="text-gray-700">{allergy.name}</span>
                        </li>
                    ))}
                </ul>

                {/* Sluitknop */}
                <button 
                    className="mt-4 px-4 py-2 bg-pastelred-700 text-white rounded-lg w-full"
                    onClick={handleClose}
                    >
                    Sluiten
                </button>
            </div>
        </div>
    );
};

export default AllergiesModal;