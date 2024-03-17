const express = require('express');
const router = express.Router();
const db = require('../models/index')

// Store a new message
const storeMessages = async (req, res) => {
    try {
        const { user_id, room_id } = req.params;
        const { messages } = req.body;

        console.log(`User ID: ${user_id}, Room ID: ${room_id}, Messages: ${messages}`);

        if (!user_id || !room_id || !messages || !messages.length) {
            return res.status(400).send({ error: 'All fields are required and messages cannot be empty.' });
        }

        const newMessages = await Promise.all(messages.map(message => 
            db.Message.create({
                user_id: user_id, 
                room_id: room_id,
                context: message,
            })
        ));

        console.log(newMessages);
        res.status(201).send(newMessages);
    } catch (error) {
        console.error('Error saving messages to database:', error);
        res.status(500).send({ error: 'An error occurred while storing the messages.' });
    }
};
// Retrieve messages for a specific room
const getMessagesByRoom = async (req, res) => {
    try {
        const { room_id } = req.params; 
        const messages = await db.Message.findAll({
            where: { room_id: room_id }, 
            order: [['createdAt', 'ASC']],
        });

        if (messages.length === 0) {
            return res.status(404).send({ message: 'No messages found for the specified room.' });
        }

        res.status(200).send(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).send({ error: 'An error occurred while retrieving messages.' });
    }
};

module.exports = {
    storeMessages,
    getMessagesByRoom
};
