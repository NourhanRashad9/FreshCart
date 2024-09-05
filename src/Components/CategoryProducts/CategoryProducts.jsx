




import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function CategoryProducts() {
  let { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wishListStatus, setWishListStatus] = useState({});
  const [loading, setLoading] = useState(null);

  let { addProductToCart } = useContext(CartContext);
  let {
    addProductToWishList,
    wishListItems,
    getUserWishList,
    removeProductFromWishList,
  } = useContext(WishListContext);

  useScrollToTop();

  function getSpecificCategory() {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let categoryProducts = res.data.data.filter(
          (product) => product.category.name === categoryName
        );
        setProducts(categoryProducts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching related products:", error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getSpecificCategory();
  }, [categoryName]);

  const handleAddToCart = async (productId) => {
    setLoading(productId);
    try {
      await addProductToCart(productId);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    getUserWishList();
  }, []);

  useEffect(() => {
    const initialStatus = {};
    products.forEach((product) => {
      initialStatus[product.id] = wishListItems?.data?.some(
        (item) => item.id === product.id
      );
    });
    setWishListStatus(initialStatus);
  }, [products, wishListItems]);

  const toggleWishList = (productId) => {
    if (wishListStatus[productId]) {
      removeProductFromWishList(productId);
    } else {
      addProductToWishList(productId);
    }
    setWishListStatus({
      ...wishListStatus,
      [productId]: !wishListStatus[productId],
    });
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Shop {categoryName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={`/productDetails/${product.id}/${product.category.name}`}>
                  <img
                    src={product.imageCover}
                    className="w-full h-40 object-cover"
                    alt={product.title}
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-1">{product.category.name}</p>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xl font-bold text-gray-900">{product.price} EGP</p>
                      <div className="flex items-center">
                        <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
                        <p className="text-gray-700">{product.ratingsAverage}</p>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-center mb-4">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
                    disabled={loading === product.id}
                  >
                    {loading === product.id ? (
                      <>
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 mr-3 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08124 50.5908C9.08124 73.2556 27.3353 91.5097 50 91.5097C72.6647 91.5097 90.9188 73.2556 90.9188 50.5908C90.9188 27.926 72.6647 9.67192 50 9.67192C27.3353 9.67192 9.08124 27.926 9.08124 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5538C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7232 75.2124 7.41289C69.5422 4.10256 63.2754 1.94025 56.7688 1.0519C51.7666 0.367437 46.6987 0.446906 41.7345 1.27866C39.2611 1.69443 37.7926 4.19778 38.4297 6.62326C39.0668 9.04874 41.539 10.4566 44.0001 10.0209C47.7756 9.3554 51.6142 9.34166 55.4078 9.98734C60.8784 10.9377 65.9981 13.0137 70.3661 16.0837C74.7342 19.1538 78.2526 23.1355 80.6395 27.7922C82.6566 31.6424 84.0506 35.7837 84.7637 40.0675C85.2979 42.4253 87.5422 43.9631 89.9676 43.326C92.393 42.6889 93.9308 40.4446 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        Loading...
                      </>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}


