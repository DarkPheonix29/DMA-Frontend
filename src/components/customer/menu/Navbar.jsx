import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Receipt } from "react-bootstrap-icons";
import AllergiesButton from "../AllergiesButton";

const Navbar = ({ onSearch, onFilterAllergies, onOpenCart }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <nav className="fixed top-0 left-0 w-full flex flex-wrap justify-around items-center p-2 bg-pastelred-400 shadow-md gap-5 z-50">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Zoek gerechten..."
                className="bg-white rounded-lg px-3 py-1.5 w-64"
            />

            <button
                onClick={onOpenCart}
                className="px-3 py-2.5 bg-white rounded-lg"
            >
                <Receipt />
            </button>

            <div className="text-1xl font-semibold cursor-pointer" onClick={() => navigate("/")}>
                Chez Samuel
            </div>

            <button
                onClick={onFilterAllergies}
                className="text-sm bg-white px-3 py-1.5 rounded-lg"
            >
                Allergieën
            </button>
        </nav>
    );
};

export default Navbar;
