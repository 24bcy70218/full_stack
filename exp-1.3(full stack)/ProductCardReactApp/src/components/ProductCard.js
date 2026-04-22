import React from "react";
import "./ProductCard.css";

function ProductCard({ name, price, inStock }) {
  return (
    <div className="card">
      <div className="image"></div>
      <h2>{name}</h2>
      <p>${price.toFixed(2)}</p>
      <span className={inStock ? "in" : "out"}>
        {inStock ? "In Stock" : "Out of Stock"}
      </span>
    </div>
  );
}

export default ProductCard;
