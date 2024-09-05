import React, { useContext, useEffect, useState } from "react";
import { WishListContext } from "../../Context/WishListContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import WishListEmpty from "../../assets/images/empty-wishlist.svg";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function WishList() {
  const { wishListItems, getUserWishList, loading, RemoveProductFromWishList } = useContext(WishListContext);
  const { addProductToCart } = useContext(CartContext);
  const [loadingCart, setLoadingCart] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false); 

  useScrollToTop();

  useEffect(() => {
    const fetchData = async () => {
      await getUserWishList();
      setHasLoaded(true); 
    };

    fetchData();
  }, [getUserWishList]);

  const handleAddToCart = async (productId) => {
    setLoadingCart(productId);
    try {
      await addProductToCart(productId);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setLoadingCart(null);
    }
  };

  return (
    <div className="p-4">
      {!hasLoaded ? (
        <LoadingSpinner />
      ) : (
        <div>
          {(!wishListItems || wishListItems.count === 0) ? (
            <div className="flex flex-col items-center text-center py-6">
              <img src={WishListEmpty} className="w-64" alt="Empty Wishlist" />
              <h2 className="text-2xl font-bold text-emerald-500">Your wishlist is empty!</h2>
              <p className="text-lg text-gray-700 dark:text-white">Explore our selection and find something you like</p>
              <Link to="/">
                <button className="mt-4 px-5 py-2.5 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:bg-green-700">Shop Now</button>
              </Link>
            </div>
          ) : (
            <div>
              <div className="text-center py-6">
                <i className="fa-regular fa-heart text-emerald-500 text-5xl"></i>
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">My Wishlist</h2>
              </div>
              <div className="overflow-x-auto">
                <div className="bg-white shadow-md border border-emerald-200 dark:border-gray-700 dark:bg-gray-800">
                  {wishListItems.data.map((product) => (
                    <div key={product._id} className="flex flex-col md:flex-row items-center justify-between border-b p-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <button onClick={() => RemoveProductFromWishList(product._id)} className="text-red-400 hover:text-red-500">
                        <i className="fa-solid fa-trash-can text-xl"></i>
                      </button>
                      <Link to={`/productDetails/${product.id}/${product.category.name}`} className="flex items-center gap-4">
                        <img src={product.imageCover} className="w-24 md:w-32" alt={product.title} />
                        <div className="flex flex-col px-4">
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">{product.title}</span>
                          <span className="text-md font-medium text-gray-700 dark:text-gray-400">{product.price} EGP</span>
                        </div>
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="mt-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50"
                        disabled={loadingCart === product.id}
                      >
                        {loadingCart === product.id ? (
                          <span className="flex items-center">
                           
                            Loading...
                          </span>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
