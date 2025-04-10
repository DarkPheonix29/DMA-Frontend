import RequestWaiterImg from "../../assets/images/requestWaiter.png";

const RequestWaiter = ({ className = ""}) => {
    return (
        <button 
            onClick={() => alert("Waiter has been requested")} 
            className={`px-3 py-3 bg-white text-black rounded-lg font-semibold shadow-md basis-10 border border-black size-fit ${className}`}
        >
            <div className="flex flex-row items-center gap-2">
                <img src={RequestWaiterImg} alt="Request the waiter" className="aspect-square object-scale-down w-7 h-7" />
                <p>Request the waiter</p>
            </div>
        </button>
    );
}

export default RequestWaiter;