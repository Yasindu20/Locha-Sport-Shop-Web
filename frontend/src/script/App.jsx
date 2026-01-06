import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";
import Shop from "../pages/shop";
import Categories from "../pages/categories";
import CategoryPage from "../pages/categoryPage";
import Deals from "../pages/deals";

import "../css/App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/deals" element={<Deals />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
