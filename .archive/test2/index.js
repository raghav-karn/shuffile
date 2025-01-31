const path = require("path");
const http = require("http");
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "/public");

app.use(express.static(publicDirPath));

io.on("connection", (socket) => {
    console.log('client connected 🎉', socket.id);

    socket.on('disconnect', () => {
        console.log('client left the socket 😢', socket.id);
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
})


io.on("connection", (socket) => {
    console.log('client connected 🎉', socket.id);

    socket.on('file-metadata', metadata => {
        socket.broadcast.emit('file-metadata', metadata)
    })

    socket.on('file-chunk', chunk => {
        socket.broadcast.emit('file-chunk', chunk)
    })

    socket.on('disconnect', () => {
        console.log('client left the socket 😢', socket.id);
    })
})


window.addEventListener('load', () => {
    let newFile = {
        buffer: [],
        metadata: null
    }

    socket.on('file-metadata', metadata => {
        // received metadata ⚡️
    })

    socket.on('file-chunk', chunk => {
        // received chunk ⚡️
    })
})

socket.on('file-metadata', metadata => {
    // received metadata ⚡️
    newFile.metadata = metadata
    newFile.buffer = []

    console.log('received metadata ⚡️')
})


socket.on('file-chunk', chunk => {
      /** Use the dynamicContent.innerHTML to show an HTML element to the user when a chunk is received. 
      You can track, calculate and display progress
      dynamicContent.innerHTML = `<b></b>`
      **/

        newFile.buffer.push(chunk)

        if (newFile.buffer.length === newFile.metadata.bufferSize) {
            // complete file has been received
            let receivedFile = new Blob(newFile.buffer)
            downloadFile(receivedFile, newFile.metadata.filename);

            newFile = {}
            alert('Yayy! File received 🎉')
        }
})



function downloadFile(blob, name = 'shared.txt') {

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = name;
    document.body.appendChild(link);

    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );

    document.body.removeChild(link);
}
