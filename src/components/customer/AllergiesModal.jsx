import { useState } from "react";
import Ei from "../../assets/images/allergies/ei.png";
import Gluten from "../../assets/images/allergies/gluten.png";
import Lupine from "../../assets/images/allergies/lupine.png";
import Melk from "../../assets/images/allergies/melk.png";
import Mosterd from "../../assets/images/allergies/mosterd.png";
import Noten from "../../assets/images/allergies/noten.png";
import Pindas from "../../assets/images/allergies/pindas.png";
import Schaaldieren from "../../assets/images/allergies/schaald.png";
import Selderij from "../../assets/images/allergies/selderij.png";
import Sesam from "../../assets/images/allergies/sesamzaad.png";
import Soja from "../../assets/images/allergies/soja.png";
import Vis from "../../assets/images/allergies/vis.png";
import Weekdieren from "../../assets/images/allergies/weekdieren.png";
import Zwavel from "../../assets/images/allergies/zwavel.png";

const allergies = [
    { id: 1, name: "Ei", icon: <img src={Ei} alt="Ei" /> },
    { id: 2, name: "Gluten", icon: <img src={Gluten} alt="Gluten" /> },
    { id: 3, name: "Lupine", icon: <img src={Lupine} alt="Lupine" /> },
    { id: 4, name: "Melk", icon: <img src={Melk} alt="Melk"  /> },
    { id: 5, name: "Mosterd", icon: <img src={Mosterd} alt="Mosterd" /> },
    { id: 6, name: "Noten", icon: <img src={Noten} alt="Noten" /> },
    { id: 7, name: "Pindas", icon: <img src={Pindas} alt="Pindas" /> },
    { id: 8, name: "Schaaldieren", icon: <img src={Schaaldieren} alt="Schaaldieren" /> },
    { id: 9, name: "Selderij", icon: <img src={Selderij} alt="Selderij" /> },
    { id: 10, name: "Sesamzaad", icon: <img src={Sesam} alt="Sesamzaad" /> },
    { id: 11, name: "Soja", icon: <img src={Soja} alt="Soja" /> },
    { id: 12, name: "Vis", icon: <img src={Vis} alt="Vis" /> },
    { id: 13, name: "Weekdieren", icon: <img src={Weekdieren} alt="Weekdieren" /> },
    { id: 14, name: "Zwavel", icon: <img src={Zwavel} alt="Zwavel" /> },
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
            <div className="overflow-y-auto max-h-[calc(80vh-140px)] bg-white p-6 rounded-lg shadow-lg w-96 z-50">
                <h2 className="text-xl font-semibold mb-4">Allergieën</h2>

                {/* Allergie Lijst */}
                <ul className="flex flex-wrap gap-4 justify-center">
                    {allergies.map((allergy) => (
                        <li key={allergy.id} className="w-[45%]">
                            <span className="text-3xl">{allergy.icon}</span>
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