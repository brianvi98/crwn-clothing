import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  ProductCardContainer,
  Name,
  Price,
  Footer,
} from "./product-card.styles";

const ProductCard = ({ prod }) => {
  const { addItemToCart } = useContext(CartContext);
  const { name, imageUrl, price } = prod;

  const addProductToCart = () => addItemToCart(prod);

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
