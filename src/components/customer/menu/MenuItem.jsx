
const MenuItem = ({ item, onClick, allergyIcons }) => {

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
                        {item.allergens?.length > 0 && (
                            <div className="flex items-center gap-1">
                                {item.allergens.map((allergy) => {
                                    const icon = allergyIcons?.[allergy];
                                    return icon ? (
                                        <img
                                            key={allergy}
                                            src={icon}
                                            alt={allergy}
                                            className="w-5 h-5"
                                        />
                                    ) : (
                                        console.warn(`Icon for ${allergy} not found`) || null
                                    );
                                })}
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