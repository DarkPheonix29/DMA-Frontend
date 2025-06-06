import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "./MenuItem";

import Ei from "../../../assets/images/allergies/ei.png";
import Gluten from "../../../assets/images/allergies/gluten.png";
import Lupine from "../../../assets/images/allergies/lupine.png";
import Melk from "../../../assets/images/allergies/melk.png";
import Mosterd from "../../../assets/images/allergies/mosterd.png";
import Noten from "../../../assets/images/allergies/noten.png";
import Pindas from "../../../assets/images/allergies/pindas.png";
import Schaaldieren from "../../../assets/images/allergies/schaald.png";
import Selderij from "../../../assets/images/allergies/selderij.png";
import Sesamzaad from "../../../assets/images/allergies/sesamzaad.png";
import Soja from "../../../assets/images/allergies/soja.png";
import Vis from "../../../assets/images/allergies/vis.png";
import Weekdieren from "../../../assets/images/allergies/weekdieren.png";
import Zwavel from "../../../assets/images/allergies/zwavel.png";

const iconMap = {
    Ei,
    Gluten,
    Lupine,
    Melk,
    Mosterd,
    Noten,
    Pindas,
    Schaaldieren,
    Selderij,
    Sesamzaad,
    Soja,
    Vis,
    Weekdieren,
    Zwavel
}

const MenuList = ({ items, onItemClick }) => {
    const [allergyIcons, setAllergyIcons] = useState({});

    useEffect(() => {
        axios.get("/api/allergens")
            .then(response =>{
                const apiAllergenes = response.data;
                const mappedIcons = {};

                apiAllergenes.forEach(element => {
                    if (iconMap[element.name]) {
                        mappedIcons[element.name] = iconMap[element.name];
                    }
                });

                setAllergyIcons(mappedIcons);
            })
            .catch(error => {
                console.error("Error fetching allergies:", error);
            });
    }, []);

    return (
        <ul className="flex flex-col items-center w-full mt-30">
            {items.length > 0 ? (
                items.map((item) => (
                        <MenuItem
                            item={item}
                            allergyIcons={allergyIcons}
                            onClick={() => onItemClick(item)}
                        />
                    </li>
                ))
            ) : (
                <p className="text-gray-500">Geen item gevonden.</p>
            )}
        </ul>
    );
};

export default MenuList;
