import React from "react";
import ProductCard from "./productCard";

const products = [
  { name: "Wireless Mouse", price: 25, inStock: true },
  { name: "Keyboard", price: 45, inStock: false },
  { name: "Monitor", price: 200, inStock: true },
];

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Product List</h1>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            inStock={product.inStock}
          />
        ))}
      </div>
    </div>
  );
}

export default App;