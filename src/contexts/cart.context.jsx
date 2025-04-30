import { useState, createContext } from "react";

// this is meant to be fed to a state updater, so always return new array
const addCartItem = (cartItems, product) => {
  // find if cart item contains product to add. if so, increment.
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    return cartItems.map((item) => {
      return item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  }

  // return new array with modified items
  return [...cartItems, { ...product, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: null,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
