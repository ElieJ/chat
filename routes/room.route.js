const express = require('express');
const { createRoom, getRoom, getRooms} = require('../controllers/room.controller');
const router = express.Router();

// Registration route
router.post('/', createRoom);

router.get('/', getRooms)

router.get('/:id', getRoom);

module.exports = router;