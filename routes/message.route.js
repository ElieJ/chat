const express = require('express');
const { storeMessages, getMessagesByRoom, getRooms} = require('../controllers/message.controller');
const router = express.Router({mergeParams: true});

// Registration route
router.post('/', storeMessages);

router.get('/', getMessagesByRoom)

module.exports = router;