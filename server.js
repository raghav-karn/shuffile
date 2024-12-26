const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Handle incoming connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // When a user joins a room, broadcast the join event
    socket.on('join-room', (room) => {
        socket.join(room);
        console.log(`${socket.id} joined room: ${room}`);
        io.to(room).emit('user-joined', socket.id);
    });

    // Handle signaling messages (ICE candidates, offers, answers)
    socket.on('signal', (data) => {
        console.log('Received signal from:', socket.id, 'to:', data.target);
        io.to(data.target).emit('signal', {
            sender: socket.id,
            signal: data.signal,
        });
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        socket.broadcast.emit('user-left', socket.id);
    });
});