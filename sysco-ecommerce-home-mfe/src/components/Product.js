import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          margin: "16px",
          width: "200px",
          cursor: "pointer",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%" }}
        />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
    </Link>
  );
};

export default Product;
