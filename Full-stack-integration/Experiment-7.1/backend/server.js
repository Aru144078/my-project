import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const products = [
  { id: 1, name: "Laptop", price: 75000 },
  { id: 2, name: "Smartphone", price: 30000 },
  { id: 3, name: "Headphones", price: 2500 },
  { id: 4, name: "Keyboard", price: 1500 }
];

// API route to get products
app.get('/api/products', (req, res) => {
  res.json(products);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));