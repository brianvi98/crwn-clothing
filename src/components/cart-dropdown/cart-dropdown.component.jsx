import React, { useContext, useEffect } from "react";
import Button from "../button/button.component";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={handleCheckoutClick}>Go to Checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
