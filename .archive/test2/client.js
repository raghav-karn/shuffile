const fileInputElement = document.getElementById('file-input')
const shareButton = document.getElementById('share-btn')
const dynamicContent = document.querySelector('.dynamic-content')
const socket = io()

window.addEventListener('load', () => {
     // run on page load
})

function downloadFile(blob, name = 'shared.txt') {
     // force download received file
}

shareButton.addEventListener('click', async () => {
      // handle share button press
})

shareButton.addEventListener('click', async () => {

     if (fileInputElement.files.length === 0) {
         alert('Choose the file you want to send 📁')
         return;
     }
 
     let file = fileInputElement.files[0]
     let reader = new FileReader()
 
     reader.onload = () => {
        // reader is loaded and ready
     }
 
     reader.readAsArrayBuffer(file)
})
 
reader.onload = () => {
     let buffer = new Uint8Array(reader.result)
     initFileShare({ filename: file.name, bufferSize: buffer.length }, buffer);
}


function initFileShare(metadata, buffer) {
     socket.emit('file-metadata', metadata)
 
     let chunkSize = 1024
     let initialChunk = 0
 
     while (initialChunk < metadata.bufferSize) {
 
         let filePiece = buffer.slice(0, chunkSize)
         console.log(metadata.bufferSize, filePiece.length)
 
         socket.emit('file-chunk', filePiece)
 
         initialChunk++;
     }
}
 