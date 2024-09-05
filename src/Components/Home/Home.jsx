import useScrollToTop from "../../hooks/useScrollToTop";
import Cart from "../Cart/Cart";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import WishList from "../WishList/WishList";

export default function Home() {
 
  // useScrollToTop();

  return (
    <>


      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </>
  );
}
