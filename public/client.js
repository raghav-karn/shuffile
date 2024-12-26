// Connect to the signaling server via Socket.IO
const socket = io();

// Get the room ID from the URL or prompt the user
const room = prompt('Enter a room ID:');

// Join the room
socket.emit('join-room', room);

// Store peer connections
const peerConnections = {};