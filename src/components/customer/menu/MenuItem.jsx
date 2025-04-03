const MenuItem = ({ item, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="px-3 py-2 bg-white text-black w-full"
        >
            <div className="bg-pastelred-900 h-px w-full"></div>
            <img src={item.image} alt={item.name} className=" aspect-video object-cover py-3" />
            <div>
                <p className="text-xl float-left ">{item.name}</p>
                <p className="text-lg float-right">€ {item.price}</p>
                <p className="left-0 bottom-0">{item.description}</p>
            </div>
        </button>
    );
}

export default MenuItem;