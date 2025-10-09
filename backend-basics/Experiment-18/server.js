// server.js
const express = require('express');
const connectDB = require('./db');
const User = require('./UserModel');
const app = express();
const port = 3000;
connectDB();
app.use(express.json());
app.post('/create-users', async (req, res) => {
    try {
        await User.deleteMany({});
        
        const initialUsers = [
            { name: 'Alice', balance: 1000 },
            { name: 'Bob', balance: 500 }
        ];

        const users = await User.insertMany(initialUsers);
        
        const formattedUsers = users.map(user => ({
            name: user.name,
            balance: user.balance,
            _id: user._id.toString(),
            __v: user.__v  
        }));

        res.status(201).json({ 
            message: 'Users created successfully.', 
            users: formattedUsers 
        });

    } catch (error) {
        console.error('Error creating users:', error);
        res.status(500).json({ message: 'Error creating users', error: error.message });
    }
});

app.post('/transfer', async (req, res) => {
    const { fromUserId, toUserId, amount } = req.body;

    if (!fromUserId || !toUserId || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: 'Invalid sender, receiver, or amount.' });
    }
    
    if (fromUserId === toUserId) {
         return res.status(400).json({ message: 'Cannot transfer money to the same account.' });
    }

    try {
        const [sender, receiver] = await Promise.all([
            User.findById(fromUserId),
            User.findById(toUserId)
        ]);

        if (!sender) {
            return res.status(404).json({ message: 'Sender account not found.' });
        }
        if (!receiver) {
            return res.status(404).json({ message: 'Receiver account not found.' });
        }

        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance.' });
        }

    
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save();
        await receiver.save();

        res.status(200).json({
            message: `Transferred $${amount} from ${sender.name} to ${receiver.name}.`,
            senderBalance: sender.balance,
            receiverBalance: receiver.balance
        });

    } catch (error) {
        console.error("Transfer Error:", error);
        res.status(500).json({ message: 'An internal error occurred during transfer.' });
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
