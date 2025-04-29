import React, { useContext } from "react";
import Button from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ prod }) => {
  const { name, imageUrl, price } = prod;
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`A picture of a ${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted">Add to Cart</Button>
    </div>
  );
};

export default ProductCard;
