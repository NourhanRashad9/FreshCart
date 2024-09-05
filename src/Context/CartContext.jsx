import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const baseUrl = `https://ecommerce.routemisr.com`;
  const [Cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function addProductToCart(productId) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("You need to be logged in to add products to the cart.");
      return;
    }
    try {
      let { data } = await axios.post(
        `${baseUrl}/api/v1/cart`,
        { productId },
        { headers: { token } }
      );
      toast(data.message, {
        style: { backgroundColor: "#34D399", color: "white" },
        icon: "🛒",
      });
      setCart(data);
    } catch (error) {
      toast.error("Failed to add product to cart.");
    }
  }

  async function getCartItems() {
    const token = localStorage.getItem("userToken");
    if (!token) return;
    setIsLoading(true);
    try {
      let { data } = await axios.get(`${baseUrl}/api/v1/cart`, {
        headers: { token },
      });
      setCart(data);
    } catch (error) {
      toast.error("Failed to retrieve cart items.");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateCartCount(productId, count, title) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("You need to be logged in to update the cart.");
      return;
    }
    if (count > 0) {
      try {
        let { data } = await axios.put(
          `${baseUrl}/api/v1/cart/${productId}`,
          { count },
          { headers: { token } }
        );
        setCart(data);
        toast.success(
          `${title.split(" ").slice(0, 2).join(" ")} updated successfully`
        );
      } catch (error) {
        toast.error("Failed to update the cart.");
      }
    } else {
      deleteProduct(productId, title);
    }
  }

  async function deleteProduct(productId, title) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("You need to be logged in to remove items from the cart.");
      return;
    }
    try {
      let { data } = await axios.delete(`${baseUrl}/api/v1/cart/${productId}`, {
        headers: { token },
      });
      toast.error(`${title.split(" ").slice(0, 2).join(" ")} removed from cart`);
      setCart(data);
    } catch (error) {
      toast.error("Failed to remove the item from the cart.");
    }
  }

  async function checkOut(shippingAddress) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("You need to be logged in to proceed to checkout.");
      return;
    }
    try {
      let { data } = await axios.post(
        `${baseUrl}/api/v1/orders/checkout-session/${Cart?.data?._id}?url=http://localhost:5173/cart`,
        { shippingAddress },
        { headers: { token } }
      );
      window.location.href = data.session.url;
    } catch (error) {
      toast.error("Failed to initiate checkout.");
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getCartItems,
        Cart,
        setCart,
        updateCartCount,
        deleteProduct,
        checkOut,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
