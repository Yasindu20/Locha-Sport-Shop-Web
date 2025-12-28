import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Home from "../pages/home";
import About from "../pages/about";
import Shop from "../pages/shop";

import "../css/App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
