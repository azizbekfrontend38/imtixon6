import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalContextProvider } from "./components/context/GlobalContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <App />
    <Toaster position="top-letf" />
  </GlobalContextProvider>
);
