import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function ProductDetails() {
  const settingsProductSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    arrows: false,
  };

  const settingsRelatedProductsSlider = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          autoplay: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          arrows: false,
        },
      },
    ],
  };

  const { id, categoryName } = useParams();
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishList } = useContext(WishListContext);

  const [Product, setProduct] = useState(null);
  const [RelatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProductId, setLoadingProductId] = useState(null);

  const getProductDetails = () => {
    setLoading(true);
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  };

  const getRelatedProducts = () => {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        const relatedProducts = res.data.data.filter(
          (product) => product.category.name === categoryName
        );
        setRelatedProducts(relatedProducts);
      })
      .catch((error) => {
        console.error("Error fetching related products:", error);
      });
  };

  const handleAddToCart = async (productId) => {
    setLoadingProductId(productId);
    try {
      await addProductToCart(productId);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setLoadingProductId(null);
    }
  };

  useEffect(() => {
    getProductDetails();
    getRelatedProducts();
  }, [id, categoryName]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="container mx-auto">
          <div className="py-12 relative flex md:flex-row flex-col">
            <div className="w-10/12 mx-auto md:w-1/4 shadow-lg shadow-slate-500 dark:shadow-lg dark:shadow-emerald-500">
              {Product?.images.length > 1 ? (
                <Slider {...settingsProductSlider}>
                  {Product?.images.map((src) => (
                    <img src={src} className="w-10/12" alt="" key={src} />
                  ))}
                </Slider>
              ) : (
                <img src={Product.imageCover} className="w-10/12" alt="" />
              )}
            </div>
            <div className="pt-10 md:pt-0 md:py-0 mx-4 md:mx-0 md:w-3/4 flex flex-col pl-8 justify-center mr-11 md:mr-0">
              <h2 className="font-semibold text-xl pb-5 md:pb-2 text-slate-900 dark:text-slate-300">
                {Product.description}
              </h2>
              <h3 className="text-gray-500 dark:text-gray-400 pb-2 font-semibold">
                {Product.title}
              </h3>
              <p className="text-emerald-700 pb-2">{Product?.category.name}</p>
              <div className="flex items-center justify-between pb-9">
                <p className="dark:text-white">{Product?.price} EGP</p>
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-star text-[#FFD43B]"></i>
                  <p className="dark:text-white">{Product?.ratingsAverage}</p>
                </div>
              </div>
              <div>
                <button onClick={() => addProductToWishList(Product.id)}>
                  <i className="fa-regular fa-heart absolute top-10 md:top-3 right-8 text-emerald-800 bg-emerald-100 rounded-2xl py-2 px-2 shadow-xl transition-transform duration-300 hover:font-bold text-2xl md:text-lg"></i>
                </button>
              </div>
              <div className="text-center font-semibold">
                <button
                  onClick={() => handleAddToCart(Product.id)}
                  className="bg-emerald-500 hover:bg-emerald-400 py-2 w-full mb-2 rounded-lg text-white"
                  disabled={loadingProductId === Product.id}
                >
                  {loadingProductId === Product.id ? "Loading..." : (
                    <>
                      <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="container mx-auto pb-4 md:w-full w-11/12">
            <h3 className="text-xl font-semibold dark:text-white pb-4">
              More Related Products
            </h3>
            <Slider {...settingsRelatedProductsSlider}>
              {RelatedProducts?.map((product) => (
                <div
                  key={product.id}
                  className="px-5 py-5 border border-solid border-emerald-400 dark:border-[#1212] shadow-lg group relative overflow-hidden dark:bg-transparent dark:shadow-emerald-500 dark:shadow-md"
                >
                  <div className="product">
                    <Link to={`/productDetails/${product.id}/${product.category.name}`}>
                      <img
                        src={product.imageCover}
                        className="w-full h-5/6 pb-2"
                        alt={product.title}
                      />
                      <p className="text-emerald-500 text-sm dark:font-semibold">
                        {product.category.name}
                      </p>
                      <h3 className="font-semibold truncate whitespace-nowrap overflow-hidden pb-2 dark:text-white">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="flex items-center justify-between pb-9">
                        <p className="dark:text-white">{product.price} EGP</p>
                        <div className="flex items-center gap-1">
                          <i className="fa-solid fa-star text-[#FFD43B]"></i>
                          <p className="dark:text-white">{product.ratingsAverage}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="text-center font-semibold absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="bg-emerald-500 hover:bg-emerald-400 py-2 w-4/5 mb-2 rounded-lg text-white"
                        disabled={loadingProductId === product.id}
                      >
                        {loadingProductId === product.id ? "Loading..." : (
                          <>
                            <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
}
