import { createContext, useContext, useState } from "react";

const useCartSource = () => {
  const [cartList, setCartList] = useState([]);

  const refreshCart = () => {
    console.log(cartList);
  };

  return { cartList, setCartList };
};

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  return (
    <CartContext.Provider value={useCartSource()}>
      {children}
    </CartContext.Provider>
  );
};
