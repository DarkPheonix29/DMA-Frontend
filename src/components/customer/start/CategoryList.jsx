import { useNavigate } from "react-router-dom";
import CategoryButton from "./CategoryButton";
import breakfestImg from "../../../assets/images/categories/ontbijt.png";
import lunchImg from "../../../assets/images/categories/lunch.png";
import dinnerImg from "../../../assets/images/categories/dinner.png";
import drinksImg from "../../../assets/images/categories/drinks.png";
import dessertsImg from "../../../assets/images/categories/toetje.png";
import sidesImg from "../../../assets/images/categories/bijgerecht.png";

const categories = [
    { name: "Lunch", image: lunchImg },
    { name: "Diner", image: dinnerImg },
    { name: "Drinken", image: drinksImg },
    { name: "Dessert", image: dessertsImg },
    { name: "Bijgerechten", image: sidesImg }
];

const CategoryList = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-wrap gap-4 justify-evenly">
            {categories.map(({name, image}) => (
                <CategoryButton key={name} text={name} image={image} onClick={() => navigate(`/menu/${name}`)} />
            ))}
        </div>
    );
}

export default CategoryList;