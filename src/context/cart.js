import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext()
const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem('cart');
    if(data) {data = JSON.parse(data); setCart(data)}
  }, [])
  

  
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext);

export {useCart, CartProvider}