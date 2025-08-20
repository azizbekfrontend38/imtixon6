import { useContext, useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { GlobalContext } from "../components/context/GlobalContext";
import { LangContext } from "../components/context/LangContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

export default function Product() {
  const { dispatch, cart } = useContext(GlobalContext);
  const { lang } = useContext(LangContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://json-api.uz/api/project/fn38-6-exam/${lang}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); // JSON formatda o‘qiyapmiz
      })
      .then((res) => {
        console.log("Server JSON:", res);
        setData(res.data); // JSON ichidagi data ni olish
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xato:", err);
        setLoading(false);
      });
  }, [lang]);

  if (loading) {
    return (
      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 container mx-auto px-5 py-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="max-w-xs rounded-2xl overflow-hidden border p-4 flex flex-col gap-2 shadow-2xl"
          >
            <Skeleton className="rounded-xl mx-auto w-40 h-44 mb-2" />
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 container mx-auto px-5 py-5">
      {data.map((product) => {
        const itemInCard = cart.find((item) => item.id === product.id);

        return (
          <div
            key={product.id}
            className="max-w-xs rounded-2xl overflow-hidden border hover:shadow-md transition p-4 flex flex-col gap-2 shadow-2xl"
          >
            <div className="rounded-xl mx-auto w-40 h-44 bg-blue-100 mb-2 flex items-center justify-center text-5xl">
              {product.name}
            </div>

            <span className="inline-block bg-yellow-300 text-xs px-2 py-1 rounded-full font-semibold w-fit">
              {product.brand}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-purple-700">
                ${product.price}
              </span>
            </div>

            <span className="inline-block bg-yellow-300 text-xs px-2 py-1 rounded font-semibold w-fit">
              {product.category}
            </span>

            <p className="text-sm text-gray-700 line-clamp-2">
              {product.description}
            </p>

            {!itemInCard && (
              <button
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: { ...product, amount: 1 },
                  });
                  toast.success("Maxsulot savatga qo‘shildi!");
                }}
                className="mt-2 bg-purple-700 flex items-center justify-center gap-2 text-white w-full py-2 rounded-lg font-semibold hover:bg-purple-800 transition cursor-pointer"
              >
                <MdAddShoppingCart />
                Savatga
              </button>
            )}

            {itemInCard && (
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-8 bg-gray-300 hover:bg-red-400"
                  onClick={() => {
                    if (itemInCard.amount === 1) {
                      dispatch({ type: "DELETE", payload: itemInCard.id });
                    } else {
                      dispatch({ type: "DECREMENT", payload: itemInCard.id });
                    }
                  }}
                >
                  -
                </Button>
                <span>{itemInCard.amount}</span>
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-8 bg-gray-300 hover:bg-amber-300"
                  onClick={() =>
                    dispatch({ type: "INCREMENT", payload: itemInCard.id })
                  }
                >
                  +
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
