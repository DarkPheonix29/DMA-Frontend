import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/customer/menu/Navbar";
import MenuList from "../../components/customer/menu/MenuList";
import AddItemModal from "../../components/customer/menu/AddItemModel";
import FullCartView from "../../components/customer/winkelmandje/FullCartView";

const MenuListPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [searchQuery, setSearchQuery] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [cartItems, setCartItems] = useState(() => {
        const stored = sessionStorage.getItem("cartItems");
        return stored ? JSON.parse(stored) : [];
    });
    const [showCart, setShowCart] = useState(false);

    // 🧠 Laad cart uit sessionStorage bij elke categorie-wijziging
    useEffect(() => {
        const storedCart = sessionStorage.getItem("cartItems");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, [category]);

    // 💾 Sla cart op in sessionStorage bij wijzigingen
    useEffect(() => {
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // 🍽️ Laad alle gerechten
    useEffect(() => {
        axios.get("/api/Dish")
            .then((response) => {
                const dataWithDishId = response.data.map(dish => ({
                    ...dish,
                    dishId: dish.dishId || dish.dishID || dish.id
                }));
                setMenuItems(dataWithDishId);
            })
            .catch((error) => {
                console.error("Error fetching dishes:", error);
            });
    }, []);

    const filteredMenuItems = menuItems.filter(
        (item) =>
            item.categories?.some(
                (cat) => cat.toLowerCase() === category?.toLowerCase()
            )
    );

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleFilterAllergies = () => {
        console.log("Filter allergies clicked");
    };

    const handleAddToCart = (item, qty) => {
        const dishId = item.dishId ?? item.id;
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
                return [...prev, { ...item, quantity: qty, dishId }];
            }
        });

        setSelectedItem(null);
    };

    const handleClearCart = () => {
        setCartItems([]);
        sessionStorage.removeItem("cartItems");
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
                    onAdd={handleAddToCart}
                />
            )}

            {showCart && (
                <FullCartView
                    items={cartItems}
                    setCartItems={setCartItems} // ✅ toevoegen
                    onClose={() => setShowCart(false)}
                    onClearCart={handleClearCart}
                />
            )}
        </div>
    );
};

export default MenuListPage;
