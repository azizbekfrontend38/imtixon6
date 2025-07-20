import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import { LangContext } from "./context/LangContext";
import { GlobalContext } from "./context/GlobalContext";
import ScrollProgress from "./ScrollProgress";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

export default function Navbar() {
  const { totalAmount, cart, dispatch } = useContext(GlobalContext);
  const { lang, setLang } = useContext(LangContext);

  return (
    <div className="bg-gray-200 sticky top-0 shadow-2xl">
      <div className="flex justify-between items-center px-5 py-5 container mx-auto font-bold text-[30px]">
        <h1>Mini Store App</h1>

        <div className="flex gap-7 items-center">
          {/* Savatcha modali */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="cursor-pointer flex items-center gap-1 relative">
                <FaCartShopping className="text-[30px]" />
                <span className="absolute top-0 right-[-10px] bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalAmount}
                </span>
              </div>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-h-[500px] overflow-y-scroll">
              <AlertDialogHeader>
                <AlertDialogTitle>Savatchangiz</AlertDialogTitle>
                <AlertDialogDescription className="space-y-4">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="border-b pb-4 mb-4 flex flex-col gap-2"
                      >
                        <p className="text-lg font-bold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Brand: {item.brand}
                        </p>
                        <p className="text-sm text-gray-600">
                          Category: {item.category}
                        </p>
                        <p className="text-sm text-gray-600">
                          Description: {item.description}
                        </p>
                        <p className="text-sm font-semibold text-emerald-600">
                          Price: ${item.price}
                        </p>
                        <p className="text-sm">Soni: {item.amount}</p>

                        <button
                          onClick={() => {
                            dispatch({ type: "DELETE", payload: item.id });
                            toast.success("Mahsulot o‘chirildi!");
                          }}
                          className="text-xs bg-blue-700 py-[5px] px-[10px] text-white rounded-2xl w-fit"
                        >
                          O‘chirish
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>Savatcha bo‘sh!</p>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              {cart.length > 0 && (
                <AlertDialogFooter className="flex justify-between">
                  <button
                    onClick={() => {
                      dispatch({ type: "CLEAR" });
                      toast.success("Savatcha tozalandi!");
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Hammasini o‘chirish
                  </button>
                  <AlertDialogCancel className="px-4 py-2 border border-gray-400 rounded">
                    Yopish
                  </AlertDialogCancel>
                </AlertDialogFooter>
              )}
              {cart.length === 0 && (
                <AlertDialogFooter>
                  <AlertDialogCancel className="px-4 py-2 border border-gray-400 rounded">
                    Yopish
                  </AlertDialogCancel>
                </AlertDialogFooter>
              )}
            </AlertDialogContent>
          </AlertDialog>

          {/* Til tanlash */}
          <div className="border-2 border-black rounded-2xl">
            <Select value={lang} onValueChange={(value) => setLang(value)}>
              <SelectTrigger className="w-[180px] cursor-pointer border-none">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  <SelectItem value="uz">Uzbek</SelectItem>
                  <SelectItem value="ru">Rus tili</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <ScrollProgress />
    </div>
  );
}
