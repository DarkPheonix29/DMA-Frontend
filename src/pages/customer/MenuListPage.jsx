import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/customer/menu/Navbar";
import MenuList from "../../components/customer/menu/MenuList";
import Pancakes from "../../assets/images/dishes/pancakes.jpg";
import BaconAndEggs from "../../assets/images/dishes/bacon_and_eggs.jpeg";
import GrilledCheeseSandwich from "../../assets/images/dishes/grilled_cheese_sandwich.jpg";
import AddItemModal from "../../components/customer/menu/AddItemModel";
import FullCartView from "../../components/customer/winkelmandje/FullCartView";

const MenuItems = [
    { id: 1, name: "Pancakes", category: "Lunch", price: 5.99, description: "Fluffy pancakes served with syrup.", image: Pancakes },
    { id: 2, name: "Bacon and Eggs", category: "Lunch", price: 7.99, description: "Classic breakfast with crispy bacon and eggs.", image: BaconAndEggs },
    { id: 3, name: "Grilled Cheese Sandwich", category: "Lunch", price: 4.99, description: "Toasted sandwich with melted cheese.", image: GrilledCheeseSandwich },
    { id: 4, name: "Spaghetti Bolognese", category: "Dinner", price: 9.99, description: "Pasta with a rich meat sauce." },
    { id: 5, name: "Coca Cola", category: "Drinks", price: 1.99, description: "Refreshing soft drink." },
    { id: 6, name: "Apple Pie", category: "Desserts", price: 3.99, description: "Homemade apple pie with vanilla ice cream." }
];

const MenuListPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);

    const filteredMenuItems = MenuItems.filter((item) => item.category === category);

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
                        setCartItems((prev) => {
                            const existing = prev.find(i => i.id === item.id);
                            if (existing) {
                                return prev.map(i =>
                                    i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
                                );
                            } else {
                                return [...prev, { ...item, quantity: qty }];
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
                    onCheckout={() => {
                        console.log("Bestelling geplaatst:", cartItems);
                    }}
                />
            )}
        </div>
    );
};

export default MenuListPage;
