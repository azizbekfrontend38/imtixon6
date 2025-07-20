import { createContext, useReducer, useEffect } from "react";

export const GlobalContext = createContext();

const getInitialState = () => {
  const saved = localStorage.getItem("cart");
  return saved
    ? JSON.parse(saved)
    : { cart: [], totalPrice: 0, totalAmount: 0 };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const found = state.cart.find((i) => i.id === action.payload.id);
      if (found) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.id === action.payload.id ? { ...i, amount: i.amount + 1 } : i
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, amount: 1 }],
      };

    case "DELETE":
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== action.payload),
      };

    case "CLEAR":
      return { ...state, cart: [], totalAmount: 0, totalPrice: 0 };

    case "INCREMENT":
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.id === action.payload ? { ...i, amount: i.amount + 1 } : i
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        cart: state.cart
          .map((i) =>
            i.id === action.payload ? { ...i, amount: i.amount - 1 } : i
          )
          .filter((i) => i.amount > 0),
      };

    case "CALC":
      const totals = state.cart.reduce(
        (acc, i) => {
          acc.totalPrice += i.price * i.amount;
          acc.totalAmount += i.amount;
          return acc;
        },
        { totalPrice: 0, totalAmount: 0 }
      );
      return { ...state, ...totals };

    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    dispatch({ type: "CALC" });
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state.cart]);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
