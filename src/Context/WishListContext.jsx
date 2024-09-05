import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishListItems, setWishListItems] = useState([]);
  const [loading, setLoading] = useState(true);

  let baseUrl = `https://ecommerce.routemisr.com`;

  async function getUserWishList() {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const headers = { token };
      let { data } = await axios.get(`${baseUrl}/api/v1/wishlist`, { headers });
      setWishListItems(data);
    } catch (error) {
      console.error("Error fetching the wishlist:", error);
      toast.error("Failed to fetch wishlist.");
    } finally {
      setLoading(false);
    }
  }

  async function addProductToWishList(productId) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("User not authenticated.");
      return;
    }
    try {
      const headers = { token };
      let { data } = await axios.post(
        `${baseUrl}/api/v1/wishlist`,
        { productId },
        { headers }
      );
      toast(data.message, {
        style: {
          backgroundColor: "white",
          color: "green",
        },
        icon: "💚",
      });
      getUserWishList();
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      toast.error("Failed to add product to wishlist.");
    }
  }

  async function RemoveProductFromWishList(productId) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("User not authenticated.");
      return;
    }
    try {
      const headers = { token };
      const response = await axios.delete(
        `${baseUrl}/api/v1/wishlist/${productId}`,
        { headers }
      );
      toast("Product removed from wishlist successfully", {
        style: {
          backgroundColor: "white",
          color: "green",
        },
        icon: "💔",
      });
      getUserWishList();
    } catch (error) {
      console.error("Error deleting product from wishlist:", error);
      toast.error("Failed to delete product from wishlist.");
    }
  }

  useEffect(() => {
    getUserWishList();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        wishListItems,
        loading,
        getUserWishList,
        addProductToWishList,
        RemoveProductFromWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
