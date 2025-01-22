import React, { createContext, useContext, useState, useEffect } from "react";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [cartCount, setCartCount] = useState(0);


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
      updateCartCount(storedCart);
    }
  }, []);

 
  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item) => {
    console.log('addToCart called with:', item);
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[item.id]) {
        updatedCart[item.id].count += 1;
      } else {
        updatedCart[item.id] = { ...item, count: 1 };
      }
      updateCartCount(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      
      if (updatedCart[itemId]) {
        delete updatedCart[itemId]; 
      }else{
        delete updatedCart[itemId];
      }
  
      updateCartCount(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); 
      return updatedCart;
    });
  };

   const decreaseFromCart = (itemId) => {
    console.log('decreaseFromCart called for:', itemId);
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[itemId]?.count > 1) {
        updatedCart[itemId].count -= 1;
      } else if (updatedCart[itemId]) {
        delete updatedCart[itemId];
      }
      updateCartCount(updatedCart);
      return updatedCart;
    });
  };

  const updateCartCount = (cart) => {
    const newCartCount = Object.values(cart).reduce(
      (acc, item) => acc + item.count,
      0
    );
    setCartCount(newCartCount);
  };

  return (
    <CartContext.Provider
      value={{ cart, cartCount, addToCart, removeFromCart, decreaseFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
