import { LangProvider } from "./components/context/LangContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Product from "./components/Product";

export default function App() {
  return (
    <div>
      <LangProvider>
        <Navbar />
        <Product />
        <Footer />
      </LangProvider>
    </div>
  );
}
