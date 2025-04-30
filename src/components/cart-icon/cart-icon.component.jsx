import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/cart.context";
import ShoppingIcon from "../../assets/shopping-bag.svg?react";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const itemCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div
      className="cart-icon-container"
      onClick={() => setIsCartOpen((prev) => !prev)}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
