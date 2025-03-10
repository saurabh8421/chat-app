const express = require('express');
const Message = require('../models/Message.js'); // Capitalized Model Name

const router = express.Router();

// API to send a message
router.post('/send', async (req, res) => {
    try {
        const { sender, receiver, message } = req.body;

        if (!sender || !receiver || !message) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const newMessage = new Message({ sender, receiver, message });

        await newMessage.save();
        res.json({ msg: 'Message sent successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error sending message', error: err.message });
    }
});


router.get('/messages/:id', async (req, res) => {
    try {
        const { id } = req.params; // Receiver's ID
        const userId = req.query.userId; // Get sender ID from query params

        if (!userId) {
            return res.status(400).json({ msg: 'Sender ID is required' });
        }

        const messages = await Message.find({
            $or: [
                { sender: userId, receiver: id },
                { sender: id, receiver: userId }
            ]
        }) // Sort messages chronologically

        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error fetching messages', error: err.message });
    }
});



module.exports = router;
