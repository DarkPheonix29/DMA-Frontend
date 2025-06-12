import { useState } from "react";
import { Receipt, ClipboardCheck } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import AllergiesButton from "../AllergiesButton";
import OrderStatusModal from "../winkelmandje/OrderStatusModal";

const Navbar = ({ onOpenCart }) => {
    const navigate = useNavigate();
    const [showOrders, setShowOrders] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 flex flex-wrap justify-around items-center p-2 bg-pastelred-400 shadow-md gap-5 z-50 w-full">
                {/* Zoekbalk */}
                <input
                    type="text"
                    placeholder="Zoek gerechten..."
                    className="bg-white rounded-lg px-3 py-1.5 w-64"
                />

                {/* Winkelmandje knop */}
                <button
                    onClick={onOpenCart}
                    className="px-3 py-2.5 bg-white rounded-lg"
                    title="Winkelmandje"
                >
                    <Receipt />
                </button>

                {/* Bestellingen knop */}
                <button
                    onClick={() => setShowOrders(true)}
                    className="px-3 py-2.5 bg-white rounded-lg"
                    title="Bekijk bestellingen"
                >
                    <ClipboardCheck />
                </button>

                {/* Logo / Home link */}
                <div
                    className="text-1xl font-bold cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    Chez Samuel
                </div>

                {/* Allergieën */}
                <AllergiesButton />
            </nav>

            {/* Pop-up voor bestellingen */}
            {showOrders && <OrderStatusModal onClose={() => setShowOrders(false)} />}
        </>
    );
};

export default Navbar;
