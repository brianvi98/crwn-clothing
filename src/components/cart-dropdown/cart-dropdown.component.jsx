import React, { useEffect } from "react";
import Button from "../button/button.component";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsCartOpen,
  selectCartItems,
} from "../../stores/cart/cart.selector";
import { setCartOpen } from "../../stores/cart/cart.action";
import CartItem from "../cart-item/cart-item.component";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    dispatch(setCartOpen(false));
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
