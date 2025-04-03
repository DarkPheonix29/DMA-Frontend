import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/customer/menu/Navbar";
import MenuList from "../../components/customer/menu/MenuList";
import Pancakes from "../../assets/images/dishes/pancakes.jpg";
import BaconAndEggs from "../../assets/images/dishes/bacon_and_eggs.jpeg";

const MenuItems = [
    { id: 1, name: "Pancakes", category: "Breakfast", price: 5.99, description: "Fluffy pancakes served with syrup.", image: Pancakes },
    { id: 2, name: "Bacon and Eggs", category: "Breakfast", price: 7.99, description: "Classic breakfast with crispy bacon and eggs.", image: BaconAndEggs },
    { id: 3, name: "Grilled Cheese Sandwich", category: "Lunch", price: 4.99, description: "Toasted sandwich with melted cheese." },
    { id: 4, name: "Spaghetti Bolognese", category: "Dinner", price: 9.99, description: "Pasta with a rich meat sauce." },
    { id: 5, name: "Coca Cola", category: "Drinks", price: 1.99, description: "Refreshing soft drink." },
    { id: 6, name: "Apple Pie", category: "Desserts", price: 3.99, description: "Homemade apple pie with vanilla ice cream." }
    //{ id: 7, name: "French Fries", category: "Sides", price: 2.99, description: "Crispy golden fries." }
]

const MenuListPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const filteredMenuItems = MenuItems.filter((item) => item.category === category);
    console.log(filteredMenuItems);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleFilterAllergies = () => {
        console.log("Filter allergies clicked");
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <div>
                <Navbar onSearch={handleSearch} onFilterAllergies={handleFilterAllergies} />
            </div>

            <MenuList items={filteredMenuItems} />
        </div>
    );
}

export default MenuListPage;