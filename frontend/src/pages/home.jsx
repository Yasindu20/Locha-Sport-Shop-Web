import Hero from "../components/homepage/hero";
import Promo from "../components/homepage/promo";
import FeaturedProducts from "../components/homepage/featuredProducts";
import Categories from "../components/homepage/categories";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Promo />
      <FeaturedProducts />
    </>
  )
}

export default Home;
