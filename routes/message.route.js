const express = require('express');
const { storeMessage, getMessagesByRoom, getRooms} = require('../controllers/message.controller');
const router = express.Router({mergeParams: true});

// Registration route
router.post('/', storeMessage);

router.get('/', getMessagesByRoom)

module.exports = router;