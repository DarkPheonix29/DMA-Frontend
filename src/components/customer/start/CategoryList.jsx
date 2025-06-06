import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryButton from "./CategoryButton";
import lunchImg from "../../../assets/images/categories/lunch.png";
import dinnerImg from "../../../assets/images/categories/dinner.png";
import drinksImg from "../../../assets/images/categories/drinks.png";
import dessertsImg from "../../../assets/images/categories/toetje.png";
import sidesImg from "../../../assets/images/categories/bijgerecht.png";

const categoryImages = [
    { name: "Lunch", image: lunchImg },
    { name: "Diner", image: dinnerImg },
    { name: "Dranken", image: drinksImg },
    { name: "Dessert", image: dessertsImg },
    { name: "Bijgerechten", image: sidesImg }
];

const CategoryList = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("/api/categories")
            .then((response) => {
                const updatedCategories = response.data.map((category) => {
                    const categoryImage = categoryImages.find((img) => img.name === category.name);
                    return {
                        ...category,
                        image: categoryImage ? categoryImage.image : null
                    };
                });
                setCategories(updatedCategories);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    return (
        <div className="flex flex-wrap gap-4 justify-evenly">
            {categories.map(({name, image}) => (
                <CategoryButton key={name} text={name} image={image} onClick={() => navigate(`/menu/${name}`)} />
            ))}
        </div>
    );
}

export default CategoryList;