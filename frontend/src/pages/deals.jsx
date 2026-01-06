import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import "../css/deals.css";
import ProductCard from "../components/shop/ProductCard";
import QuickViewModal from "../components/shop/QuickViewModal";

const Deals = () => {
  const [allDeals, setAllDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // refs
  const categoryScrollRef = useRef(null);
  const activeCategoryRef = useRef(null);
  const scrollTimeout = useRef(null);

  const [isScrolling, setIsScrolling] = useState(false);

  // ========================================
  // DEAL CATEGORIES
  // ========================================
  const dealCategories = [
    { id: "all", name: "All Deals", icon: "🔥" },
    { id: "flash", name: "Flash Deals", icon: "⚡" },
    { id: "clearance", name: "Clearance", icon: "🏷️" },
    { id: "bogo", name: "Buy One Get One", icon: "🎁" },
    { id: "limited", name: "Limited Time", icon: "⏰" },
  ];

  // ========================================
  // SNAP ACTIVE CATEGORY TO CENTER
  // ========================================
  useEffect(() => {
    if (activeCategoryRef.current) {
      activeCategoryRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedCategory]);

  // ========================================
  // SCROLL SHADOW HANDLER
  // ========================================
  const handleScroll = () => {
    setIsScrolling(true);
    clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  };

  // ========================================
  // ARROW SCROLL
  // ========================================
  const scrollByAmount = (amount) => {
    categoryScrollRef.current?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  // ========================================
  // MOCK DEALS
  // ========================================
  useEffect(() => {
    setTimeout(() => {
      setAllDeals([
        {
          _id: "1",
          name: "Running Shoes",
          price: 89.99,
          originalPrice: 149.99,
          discount: 40,
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
          dealType: "flash",
        },
        {
          _id: "2",
          name: "Tennis Racket",
          price: 129.99,
          originalPrice: 249.99,
          discount: 48,
          image:
            "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=500",
          dealType: "clearance",
        },
        {
          _id: "3",
          name: "Swimming Goggles",
          price: 19.99,
          originalPrice: 39.99,
          discount: 50,
          image:
            "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500",
          dealType: "limited",
        },
      ]);
      setLoading(false);
    }, 700);
  }, []);

  // ========================================
  // FILTER
  // ========================================
  const filteredDeals = useMemo(() => {
    if (selectedCategory === "all") return allDeals;
    return allDeals.filter(
      (deal) => deal.dealType === selectedCategory
    );
  }, [allDeals, selectedCategory]);

  return (
    <div className="deals-page">
      {/* CATEGORY BAR */}
      <div
        className={`deal-categories-section ${
          isScrolling ? "scrolling" : ""
        }`}
      >
        {/* LEFT ARROW */}
        <button
          className="scroll-arrow left"
          onClick={() => scrollByAmount(-250)}
        >
          ‹
        </button>

        {/* RIGHT ARROW */}
        <button
          className="scroll-arrow right"
          onClick={() => scrollByAmount(250)}
        >
          ›
        </button>

        {/* GRADIENT FADES */}
        <div className="fade fade-left" />
        <div className="fade fade-right" />

        <div className="container">
          <div
            className="deal-categories snap-scroll"
            ref={categoryScrollRef}
            onScroll={handleScroll}
          >
            {dealCategories.map((category) => (
              <button
                key={category.id}
                ref={
                  selectedCategory === category.id
                    ? activeCategoryRef
                    : null
                }
                className={`category-btn snap-item ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() =>
                  setSelectedCategory(category.id)
                }
              >
                <span className="category-icon">
                  {category.icon}
                </span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="deals-content">
        <div className="container">
          <div className="deals-grid">
            {!loading &&
              filteredDeals.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onQuickView={() =>
                    setQuickViewProduct(product)
                  }
                />
              ))}
          </div>
        </div>
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default Deals;
