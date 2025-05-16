import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/customer/menu/Navbar";
import MenuList from "../../components/customer/menu/MenuList";
import Pancakes from "../../assets/images/dishes/pancakes.jpg";
import BaconAndEggs from "../../assets/images/dishes/bacon_and_eggs.jpeg";
import GrilledCheeseSandwich from "../../assets/images/dishes/grilled_cheese_sandwich.jpg";
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
        axios.get("/api/dish") 
            .then((response) => {
                setMenuItems(response.data);
                console.log(menuItems[0]);
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
