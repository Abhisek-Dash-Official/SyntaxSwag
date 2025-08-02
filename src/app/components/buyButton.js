import { useRouter } from "next/navigation";
import { FaShoppingBag } from "react-icons/fa";
import { toast } from "react-toastify";

export default function BuyButton({ item }) {
  const router = useRouter();
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
      carts.push({
        _id: item._id,
        title: item.title,
        quantity: 1,
        type: item.type,
      });
    }

    localStorage.setItem("carts", JSON.stringify(carts));
    toast.success("Innitiallising your purchase!");
    router.push("/checkout");
  };
  return (
    <button
      className="bg-lime-500 text-white px-6 py-2 rounded-lg hover:bg-lime-600 transition"
      onClick={handleClick}
    >
      <span>Buy Now</span>
      <span>
        <FaShoppingBag />
      </span>
    </button>
  );
}
