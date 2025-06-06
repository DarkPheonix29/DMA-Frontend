const CategoryButton = ({ text, image, onClick }) => {
  return (
    <button
        onClick={onClick}
        className="px-6 py-3 bg-pastelred-400 text-black rounded-lg font-semibold shadow-md basis-35 border border-black overflow-hidden"
    >
      <img src={image} alt={text} className="aspect-square object-cover" />
        {text}
    </button>
  );
}

export default CategoryButton;