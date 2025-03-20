import { useParams, useNavigate } from "react-router-dom";

const MenuItems = [
    { id: 1, name: "Pancakes", category: "Breakfast" },
    { id: 2, name: "Bacon and Eggs", category: "Breakfast" },
    { id: 3, name: "Grilled Cheese Sandwich", category: "Lunch" },
    { id: 4, name: "Spaghetti Bolognese", category: "Dinner" },
    { id: 5, name: "Coca Cola", category: "Drinks" },
    { id: 6, name: "Apple Pie", category: "Desserts" },
    //{ id: 7, name: "French Fries", category: "Sides" }
]

const MenuListPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const filteredMenuItems = MenuItems.filter((item) => item.category === category);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Menu - {category}</h1>
            <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold shadow-md transition hover:bg-blue-700"
            >
                Terug naar categorieën
            </button>

            <ul className="space-y-2">
                {filteredMenuItems.length > 0 ? (
                    filteredMenuItems.map((item, index) => (
                        <li key={index} className="p-2 bg-gray-100 rounded-md">
                        {item.name}
                        </li>
                    ))
                ) : (
                <p className="text-gray-500">Geen items gevonden.</p>
                )}
            </ul>
        </div>
    );
}

export default MenuListPage;