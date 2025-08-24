import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCartOpen = (isOpen) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen);

export const addItemToCart = (cartItems, product) => {
  const newCartItems = addCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, product) => {
  const newCartItems = removeCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, product) => {
  const newCartItems = clearCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

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
