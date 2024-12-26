// Connect to the signaling server via Socket.IO
const socket = io();

// Get the room ID from the URL or prompt the user
const room = prompt('Enter a room ID:');

// Join the room
socket.emit('join-room', room);

// Store peer connections
const peerConnections = {};

// Create a STUN server configuration
const configuration = {
  iceServers: [
      {
          urls: 'stun:stun.l.google.com:19302', // Google's public STUN server
      }
  ]
};

// Function to create a new peer connection
function createPeerConnection(targetId) {
  console.log('Creating peer connection for:', targetId);

  const pc = new RTCPeerConnection(configuration);

  // Create a data channel for file transfer
  const dataChannel = pc.createDataChannel('fileTransfer');
  
  // Handle data channel open event
  dataChannel.onopen = () => {
      console.log('Data channel open on sender side');
  };

  // Handle incoming messages on data channel (on the receiving side)
  dataChannel.onmessage = (event) => {
      console.log('Data received on data channel:', event.data);
      downloadFile(event.data); // Function to download the received file
  };

  pc.onicecandidate = (event) => {
      if (event.candidate) {
          console.log('Sending ICE candidate:', event.candidate);
          socket.emit('signal', {
              target: targetId,
              signal: event.candidate,
          });
      }
  };

  pc.ondatachannel = (event) => {
      console.log('Data channel received on peer connection:', event.channel);
      const dataChannel = event.channel;

      // Handle receiving the file on the second tab (peer)
      dataChannel.onmessage = (event) => {
          console.log('Data received on receiver side:', event.data);
          downloadFile(event.data); // Function to download the received file
      };

      dataChannel.onopen = () => {
          console.log('Data channel open on receiver side');
      };
  };

  return pc;
}

// Handle the "send file" button click event
document.getElementById('sendFileButton').addEventListener('click', async () => {
  const file = document.getElementById('fileInput').files[0];
  if (!file) {
      console.log('No file selected!');
      return;
  }

  console.log('Sending file:', file);

  // Read the file as an ArrayBuffer
  const reader = new FileReader();
  reader.onload = () => {
      const data = reader.result;

      // Log the file data to make sure it’s read correctly
      console.log('File data:', data);

      // Send the file data via the data channels of all peers
      Object.values(peerConnections).forEach((pc) => {
          const dataChannel = pc.createDataChannel('fileTransfer');
          dataChannel.onopen = () => {
              console.log('Data channel is open, sending file...');
              dataChannel.send(data); // Send the file data
          };
      });
  };
  reader.readAsArrayBuffer(file);
});

// Handle signaling messages from the server
socket.on('signal', async (data) => {
  console.log('Received signal:', data);
  const { sender, signal } = data;

  if (!peerConnections[sender]) {
      peerConnections[sender] = createPeerConnection(sender);
  }

  const pc = peerConnections[sender];

  await pc.setRemoteDescription(signal);

  if (signal.type === 'offer') {
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('signal', {
          target: sender,
          signal: pc.localDescription,
      });
  }
});

// Function to download the received file
function downloadFile(data) {
  const blob = new Blob([data], { type: 'application/octet-stream' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'received_file'; // Name of the received file
  link.click();
}