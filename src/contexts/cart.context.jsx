import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

// this is meant to be fed to a state updater, so always return new array
const removeCartItem = (cartItems, product) => {
  // find if cart item contains product to add. if so, increment.
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (!existingItem) return cartItems;

  if (existingItem.quantity === 1) {
    return clearCartItem(cartItems, product);
  }

  return cartItems.map((item) => {
    return item.id === product.id
      ? { ...item, quantity: item.quantity - 1 }
      : item;
  });
};

const clearCartItem = (cartItems, product) => {
  // return new array with modified items
  return cartItems.filter((item) => item.id !== product.id);
};

export const CartContext = createContext({
  isCartOpen: null,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
});

const INITIAL_STATE = {
  isCartOpen: null,
  cartItems: [],
};

const CART_ACTION_TYPES = {
  SET_CART_OPEN: "SET_CART_OPEN",
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
  CLEAR_CART_ITEM: "CLEAR_CART_ITEM",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: addCartItem(state.cartItems, payload),
      };
    case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: removeCartItem(state.cartItems, payload),
      };
    case CART_ACTION_TYPES.CLEAR_CART_ITEM:
      return {
        ...state,
        cartItems: clearCartItem(state.cartItems, payload),
      };
    default:
      throw new Error(`Unhandled type of ${type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool));
  };

  const addItemToCart = (product) => {
    dispatch(createAction(CART_ACTION_TYPES.ADD_ITEM_TO_CART, product));
  };

  const removeItemFromCart = (product) => {
    dispatch(createAction(CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART, product));
  };

  const clearItemFromCart = (product) => {
    dispatch(createAction(CART_ACTION_TYPES.CLEAR_CART_ITEM, product));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
