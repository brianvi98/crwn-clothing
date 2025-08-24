import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../stores/cart/cart.action";
import { selectCartItems } from "../../stores/cart/cart.selector";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  ProductCardContainer,
  Name,
  Price,
  Footer,
} from "./product-card.styles";

const ProductCard = ({ prod }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, imageUrl, price } = prod;
  const addProductToCart = () => dispatch(addItemToCart(cartItems, prod));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`A picture of a ${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to Cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
