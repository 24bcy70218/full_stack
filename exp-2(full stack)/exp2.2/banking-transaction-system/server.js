require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Models
const Account = require('./models/Account');
const Transaction = require('./models/Transaction');


// ✅ Root Route (for browser)
app.get('/', (req, res) => {
    res.send("🚀 Banking Transaction API is running");
});


// ✅ Transfer Route (Main Feature)
app.post('/transfer', async (req, res) => {
    const { from, to, amount } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find accounts
        const sender = await Account.findOne({ name: from }).session(session);
        const receiver = await Account.findOne({ name: to }).session(session);

        if (!sender || !receiver) {
            throw new Error("Account not found");
        }

        if (sender.balance < amount) {
            throw new Error("Insufficient balance");
        }

        // Perform transaction
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save({ session });
        await receiver.save({ session });

        // Log success transaction
        await Transaction.create([{
            from,
            to,
            amount,
            status: "SUCCESS"
        }], { session });

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        res.json({
            message: "✅ Transfer Successful"
        });

    } catch (err) {
        // Rollback
        await session.abortTransaction();
        session.endSession();

        // Log failed transaction
        await Transaction.create({
            from,
            to,
            amount,
            status: "FAILED",
            error: err.message
        });

        res.status(400).json({
            error: err.message
        });
    }
});


// Server Start
app.listen(5000, () => {
    console.log("Server running on port 5000");
});