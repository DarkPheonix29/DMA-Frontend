import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Receipt } from "react-bootstrap-icons";
import AllergiesButton from "../AllergiesButton";

const Navbar = ({onSearch, onFilterAllergies }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <nav className="fixed top-0 left-0 flex flex-wrap justify-around items-center p-2 bg-pastelred-400 shadow-md gap-5">
            {/* Zoekbalk */}
            <input
                type="text"
                placeholder="Zoek gerechten..."
                
                className=" bg-white rounded-lg px-3 py-1.5 w-64"
            />

            <button 
                onClick={() => alert("Naar bon")}
                className="px-3 py-2.5 bg-white rounded-lg"
                >
                <Receipt />
            </button>

            <div className="text-1xl" onClick={() => navigate("/")}>
                Chez Samuel
            </div>

            <AllergiesButton />
        </nav>
    );
};

export default Navbar;