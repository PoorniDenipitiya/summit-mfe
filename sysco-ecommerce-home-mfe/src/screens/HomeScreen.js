import Product from "../components/Product";

const HomeScreen = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      title: "Product 1",
      description: "This is a description of Product 1.",
      price: 29.99,
    },
    {
      id: 2,
      title: "Product 2",
      description: "This is a description of Product 2.",
      price: 39.99,
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default HomeScreen;
