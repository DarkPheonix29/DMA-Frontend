import { useState, useEffect } from "react";
import AllergiesModal from "./AllergiesModal";

const AllergiesButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [isOpen]);

    return (
        <>
            <button 
                className="px-4 py-2 bg-white rounded-lg shadow-md border"
                onClick={() => setIsOpen(true)}
            >
                Allergieën
            </button>

            {isOpen && <AllergiesModal onClose={() => setIsOpen(false)} />}
        </>
    );
};

export default AllergiesButton;