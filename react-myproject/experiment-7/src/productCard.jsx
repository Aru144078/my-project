function ProductCard({ name, price, inStock }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "8px",
        padding: "16px",
        width: "180px",
        textAlign: "center",
      }}
    >
      <h2>{name}</h2>
      <p>Price: ${price}</p>
      <p>Status: {inStock ? "In Stock" : "Out of Stock"}</p>
    </div>
  );
}

export default ProductCard;