import { useNavigate } from "react-router-dom";
import CategoryButton from "./CategoryButton";

const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Drinks",
    "Desserts",
    "Sides"
];

const CategoryList = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Kies een categorie</h1>
            <div className="flex flex-wrap gap-4">
                {categories.map((category) => (
                    <CategoryButton key={category} text={category} onClick={() => navigate(`/menu/${category}`)} />
                ))}
            </div>
        </div>
    );
}

export default CategoryList;