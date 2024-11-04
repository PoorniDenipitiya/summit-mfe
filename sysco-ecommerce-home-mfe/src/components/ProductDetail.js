import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  // Sample data, in a real app you would fetch this from an API
  const product = {
    1: {
      title: "Product 1",
      description: "This is a detailed description of Product 1.",
      price: 29.99,
    },
    2: {
      title: "Product 2",
      description: "This is a detailed description of Product 2.",
      price: 39.99,
    },
  }[id]; // Fetch the product by ID

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <img src={product.image} alt={product.title} style={{ width: "300px" }} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductDetail;
