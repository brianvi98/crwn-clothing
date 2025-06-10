import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/cart.context";
import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const itemCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <CartIconContainer onClick={() => setIsCartOpen((prev) => !prev)}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{itemCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
