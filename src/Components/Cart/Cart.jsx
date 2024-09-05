import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import CartEmpty from "../../assets/images/shopping-cart_782150.png";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function Cart() {
  const { getCartItems, Cart, updateCartCount, deleteProduct, isLoading } = useContext(CartContext);
  useScrollToTop();

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="py-5">
      {Cart && Cart.data.products.length ? (
        <>
          <div className="flex gap-4 items-center justify-center mb-5">
            <h2 className="text-4xl font-bold text-emerald-500">My Cart</h2>
           
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 mx-auto space-y-4">
              {Cart.data.products.map((product) => (
                <div key={product._id} className="bg-white border-b flex md:flex-row flex-col items-center md:justify-between p-4 shadow-md hover:bg-gray-100 dark:bg-[#282828] dark:hover:bg-[#121212]">
                  <img src={product.product.imageCover} className="w-32 h-32 object-cover" alt={product.product.title || "Product"} />
                  <div className="flex-1 px-4 py-2 font-semibold text-gray-900 dark:text-white">
                    {product.product?.title?.split(" ").slice(0, 2).join(" ") || "Product Title"}
                  </div>
                  <div className="flex items-center px-4 py-2">
                    <button onClick={() => updateCartCount(product.product.id, product.count - 1, product.product.title)} className="p-1 bg-emerald-500 text-white rounded-full hover:bg-emerald-600">
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <div className="mx-4 font-semibold text-sm dark:text-white">{product.count}</div>
                    <button onClick={() => updateCartCount(product.product.id, product.count + 1, product.product.title)} className="p-1 bg-emerald-500 text-white rounded-full hover:bg-emerald-600">
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <div className="px-4 py-2 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </div>
                  <button onClick={() => deleteProduct(product.product.id, product.product.title)} className="text-red-600 hover:bg-red-600 hover:text-white border border-red-600 rounded-lg px-4 py-2">
                    Remove <i className="fa-solid fa-trash ms-2"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="md:w-1/5 w-full mx-auto mt-5 md:mt-0 border rounded-md bg-emerald-500 text-white shadow-lg p-4">
              <p className="text-lg font-semibold text-center mb-2">Cart Summary</p>
              <p className="text-base font-semibold text-center mb-4">Total: {Cart.data.totalCartPrice} EGP</p>
              <Link to="/checkout">
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded-lg flex items-center justify-center">
                  CheckOut Now <i className="fa-solid fa-cart-plus ms-2"></i>
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <img src={CartEmpty} className="h-64 md:h-80" alt="Cart Empty" />
          <h2 className="text-2xl font-extrabold text-emerald-500">Your Cart is Empty</h2>
          <p className="text-lg text-gray-700 dark:text-white">Browse categories and discover our best offers!</p>
          <Link to="/">
            <button className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-5 py-2.5">Shop Now</button>
          </Link>
        </div>
      )}
    </div>
  );
}
