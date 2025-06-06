import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/customer/menu/Navbar";
import MenuList from "../../components/customer/menu/MenuList";
import AddItemModal from "../../components/customer/menu/AddItemModel";
import FullCartView from "../../components/customer/winkelmandje/FullCartView";

const MenuListPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        axios.get("/api/Dish")
            .then((response) => {

            })
            .catch((error) => {
                console.error("Error fetching dishes:", error);
            });
    }, []);

    const filteredMenuItems = menuItems.filter((item) => item.categories[0] === category);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleFilterAllergies = () => {
        console.log("Filter allergies clicked");
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <Navbar
                onSearch={handleSearch}
                onFilterAllergies={handleFilterAllergies}
                onOpenCart={() => setShowCart(true)}
            />

            <MenuList items={filteredMenuItems} onItemClick={setSelectedItem} />

            {selectedItem && (
                <AddItemModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onAdd={(item, qty) => {
                        const dishId = item.dishId;

                        if (!dishId) {
                            console.error("Geen geldig dishId gevonden voor item:", item);
                            return;
                        }

                        setCartItems((prev) => {
                            const existing = prev.find(i => i.dishId === dishId);

                            if (existing) {
                                return prev.map(i =>
                                    i.dishId === dishId
                                        ? { ...i, quantity: i.quantity + qty }
                                        : i
                                );
                            } else {
                                return [...prev, {
                                    ...item,
                                    quantity: qty,
                                    dishId // ✅ zorg dat hij er altijd in zit
                                }];
                            }
                        });

                        setSelectedItem(null);
                    }}
                />
            )}

            {showCart && (
                <FullCartView
                    items={cartItems}
                    onClose={() => setShowCart(false)}
                    onClearCart={() => setCartItems([])}
                />
            )}
        </div>
    );
};

export default MenuListPage;
