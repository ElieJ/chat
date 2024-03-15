const express = require('express');
const router = express.Router();
const db = require('../models/index')

// Store a new message
const storeMessage = async (req, res) => {
    try {
        const { user_id, room_id } = req.params;
        console.log(req.params)
        const { message } = req.body;

        console.log(message + " message ")
        console.log(user_id + " user  ")
        console.log(room_id+ " room ")

        if (!user_id || !room_id || !message) {
            return res.status(400).send({ error: 'All fields are required.' });
        }
        const newMessage = await db.Message.create({
            user_id: user_id, 
            room_id: room_id,
            context: message,
        });

        console.log(newMessage)
        res.status(201).send(newMessage);
    } catch (error) {
        console.error('Error saving message to database:', error);
        res.status(500).send({ error: 'An error occurred while storing the message.' });
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
    storeMessage,
    getMessagesByRoom
};
