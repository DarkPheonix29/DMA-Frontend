import MenuItem from "./MenuItem";

const MenuList = ({ items, onItemClick }) => {
    return (
        <ul className="flex flex-col items-center w-full mt-30">
            {items.length > 0 ? (
                items.map((item) => (
                    <li key={item.dishId} className="w-full">
                        <MenuItem
                            item={item}
                            onClick={() => onItemClick(item)}
                        />
                    </li>
                ))
            ) : (
                <p className="text-gray-500">Geen items gevonden.</p>
            )}
        </ul>
    );
};

export default MenuList;
