import MenuItem from "./MenuItem";

const MenuList = ({ items, onItemClick }) => {
    console.log(items);
    return (
    <ul className="flex flex-col items-center w-full mt-30">
        {items.length > 0 ? (
            items.map((item) => (
                <MenuItem
                    key={item.id}
                    item={item}
                    onClick={() => onItemClick(item)}
                />
            ))
        ) : (
            <p className="text-gray-500">Geen items gevonden.</p>
        )}
    </ul>
    );
};

export default MenuList;