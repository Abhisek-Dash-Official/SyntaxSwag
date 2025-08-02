import { FaCartShopping } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function AddToCatButton({ item }) {
  let carts = [];
  const loadCarts = () => {
    carts = JSON.parse(localStorage.getItem("carts") || "[]");
  };
  const handleClick = () => {
    loadCarts();

    const index = carts.findIndex((cart) => cart._id === item._id);

    if (index !== -1) {
      carts[index].quantity += 1;
    } else {
      const new_cart = {
        _id: item._id,
        title: item.title,
        quantity: 1,
        type: item.type,
      };
      carts.push(new_cart);
    }

    localStorage.setItem("carts", JSON.stringify(carts));
    toast.success("Item added to cart successfully!");
  };
  return (
    <button
      className="bg-lime-500 text-white px-6 py-2 rounded-lg hover:bg-lime-600 transition"
      onClick={handleClick}
    >
      <span>Add to Cart</span>
      <span>
        <FaCartShopping />
      </span>
    </button>
  );
}
