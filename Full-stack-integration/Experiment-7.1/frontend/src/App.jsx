import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching products');
        setLoading(false);
      });
  }, []);

  const handleBuy = (product) => {
    alert(`You bought: ${product.name} for ₹${product.price}`);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h1>Product List</h1>
      {products.map(product => (
        <div key={product.id} className="card">
          <strong>{product.name}</strong>
          <p>₹{product.price}</p>
          <button onClick={() => handleBuy(product)}>Buy</button>
        </div>
      ))}
    </div>
  );
}

export default App;