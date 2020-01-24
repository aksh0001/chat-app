let express = require('express'); // express.js for quick setup
let socket = require('socket.io');
const LISTEN_PORT = 7777;

// app setup
let app = express();

// server setup (listens to requests on port 7777)
let server = app.listen(LISTEN_PORT, () => {
    console.log('Listening to requests on port ' + LISTEN_PORT);
});

// serve static files in public folder
app.use(express.static('public'));

// socket setup on server
let io = socket(server);

// setup stuff when client connects to this socket
io.on('connection', (socket) => {
    console.log('Socket connection successful', socket.id);
    socket.on('chat', (msgData) => { // catch the message name 'chat' and the data from client
        io.sockets.emit('chat', msgData); // emit message back to all clients, who will then display it
    });
    socket.on('typing', (uName) => { // listen for typing; this time we broadcast this message
        socket.broadcast.emit('typing', uName);  // broadcast will send a message to all clients except the one who initiated the message
    })
});