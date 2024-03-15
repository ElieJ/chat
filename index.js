const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require('./routes/auth.route');
const roomRoute = require('./routes/room.route');
const messageRoute = require('./routes/message.route');
const { join } = require('path');

const { Server } = require("socket.io");
const http = require("http");

dotenv.config();

const port = 3500;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());
app.use('/api', authRoute);
app.use('/rooms', roomRoute);
app.use('/users/:user_id/rooms/:room_id/messages', messageRoute);
app.get('/users/:user_id/rooms', (req, res) => {
    res.sendFile(join(__dirname, 'rooms.html'));
});
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'home.html'));
});

app.get('/users/:user_id/rooms/:room_id', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join room', (roomId) => {
        socket.join(roomId);
        console.log(`A user joined room ${roomId}`);
    });

    socket.on('chat message', (data) => {
        console.log('Message: ' + data.message + ', from user: ' + data.userId + ', in room: ' + data.roomId);

        socket.to(data.roomId).emit('chat message', {
          message: data.message,
          userId: data.userId,
          roomId: data.roomId
        });
    });

});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
