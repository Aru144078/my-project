// server.js
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;


const JWT_SECRET = 'your_super_secret_key'; // Use process.env.JWT_SECRET in real apps
const HARDCODED_USER = { username: 'user1', password: 'password123', id: 1 };


const accounts = new Map();
accounts.set(HARDCODED_USER.id, { balance: 1000 });


app.use(express.json());


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: Token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = user;
        next();
    });
}


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    
    if (username !== HARDCODED_USER.username || password !== HARDCODED_USER.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const payload = { id: HARDCODED_USER.id, username: HARDCODED_USER.username };

    // 3. Sign token (expires in 1 hour)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});
app.get('/balance', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const account = accounts.get(userId);

    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }

    res.json({ balance: account.balance });
});

app.post('/deposit', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { amount } = req.body;

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: 'Invalid deposit amount' });
    }

    const account = accounts.get(userId);
    account.balance += amount;

    res.json({
        message: `Deposited $${amount}`,
        newBalance: account.balance
    });
});


app.post('/withdraw', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { amount } = req.body;

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: 'Invalid withdrawal amount' });
    }

    const account = accounts.get(userId);

    if (account.balance < amount) {
        return res.status(400).json({ message: 'Insufficient funds' });
    }

    account.balance -= amount;

    res.json({
        message: `Withdrew $${amount}`,
        newBalance: account.balance
    });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
