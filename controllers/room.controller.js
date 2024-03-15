const express = require('express');
const router = express.Router();
const db = require('../models/index')

// Get room by id
const getRoom = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ error: 'Room ID must be provided for search.' });
        }

        const room = await db.Room.findOne({ where: { id } })

        if (!room) {
            return res.status(404).send({ message: 'Room not found.' });
        }

        res.status(200).send(room);
    } catch (error) {
        console.error('Search Room Error:', error);
        res.status(500).send({ error: 'An error occurred while searching for the room.' });
    }
}

const getRooms = async (req, res) => {
    try {
        
        const room = await db.Room.findAll()
        if (!room) {
            return res.status(404).send({ message: 'No room was found.' });
        }
        res.status(200).send(room);
    } catch (error) {
        console.error('Search Room Error:', error);
        res.status(500).send({ error: 'An error occurred while searching for the rooms.' });
    }
}

// Create a new room
const createRoom = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send({ error: 'Room name is required.' });
        }

        const existingRoom = await Room.findOne({ where: { name } });
        if (existingRoom) {
            return res.status(400).send({ message: 'Room already exists.' });
        }

        const room = await Room.create({ name });

        res.status(201).send(room);
    } catch (error) {
        console.error('Create Room Error:', error);
        res.status(500).send({ error: 'An error occurred while creating the room.' });
    }
}

module.exports = {
    createRoom,
    getRoom,
    getRooms
}