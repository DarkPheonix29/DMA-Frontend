import Ei from "../../../assets/images/allergies/ei.png";
import Gluten from "../../../assets/images/allergies/gluten.png";
import Lupine from "../../../assets/images/allergies/lupine.png";
import Melk from "../../../assets/images/allergies/melk.png";
import Mosterd from "../../../assets/images/allergies/mosterd.png";
import Noten from "../../../assets/images/allergies/noten.png";
import Pindas from "../../../assets/images/allergies/pindas.png";
import Schaaldieren from "../../../assets/images/allergies/schaald.png";
import Selderij from "../../../assets/images/allergies/selderij.png";
import Sesam from "../../../assets/images/allergies/sesamzaad.png";
import Soja from "../../../assets/images/allergies/soja.png";
import Vis from "../../../assets/images/allergies/vis.png";
import Weekdieren from "../../../assets/images/allergies/weekdieren.png";
import Zwavel from "../../../assets/images/allergies/zwavel.png";

const allergyIcons = {
    Ei: Ei,
    Gluten: Gluten,
    Lupine: Lupine,
    Melk: Melk,
    Mosterd: Mosterd,
    Noten: Noten,
    Pindas: Pindas,
    Schaaldieren: Schaaldieren,
    Selderij: Selderij,
    Sesamzaad: Sesam,
    Soja: Soja,
    Vis: Vis,
    Weekdieren: Weekdieren,
    Zwavel: Zwavel
}

const MenuItem = ({ item, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="px-3 py-2 bg-white text-black w-full"
        >
            <div className="bg-pastelred-900 h-px w-full"></div>
            <img src={item.image} alt={item.name} className=" aspect-video object-cover py-3" />
            <div>
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl">{item.name}</h3>
                        
                        {item.allergens && item.allergens.length > 0 && (
                            <div className="flex items-center gap-1">
                                {item.allergens.map((allergy) => 
                                    allergyIcons[allergy] ? (
                                        <img
                                            key={allergy}
                                            src={allergyIcons[allergy]}
                                            alt={allergy}
                                            className="w-6 h-6"
                                        />
                                    ) : null
                                    )}
                            </div>
                        )}
                    </div>
                    
                    <span className="text-lg">€ {item.price}</span>
                </div>
                <p className="text-sm float-left">{item.description}</p>
            </div>
        </button>
    );
}

export default MenuItem;