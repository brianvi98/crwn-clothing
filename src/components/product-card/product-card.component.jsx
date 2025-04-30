import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ prod }) => {
  const { cartItems, addItemToCart } = useContext(CartContext);
  const { name, imageUrl, price } = prod;

  const addProductToCart = () => addItemToCart(prod);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`A picture of a ${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
