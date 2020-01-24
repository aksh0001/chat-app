// Make connection client side
let client_socket = io.connect('http://localhost:7777'); // connect to server socket bound to port 7777

// query dom
let message = document.getElementById('message'), handle = document.getElementById('handle'),
    btn = document.getElementById('send'), output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// ------- Event Listeners: Listen for event and emit data to server socket ---------- //
// Event 1: Button Send event -> emit message name "chat" and the value and handle of the message
btn.addEventListener('click', () => {
    client_socket.emit('chat', {  // emit takes 2 params: (name of message, message data)
        message: message.value,
        handle: handle.value
    })
});
// Event 2: Key press -> emit message name "typing" and the user name (handle)
message.addEventListener('keypress', () => {
    client_socket.emit('typing', handle.value)
});

// Catch socket messages back from server
// Event 1: Button Send event -> spit out msg to the dom
client_socket.on('chat', (msgData) => {
    feedback.innerHTML = '';  // clear "typing" field after message sent
    output.innerHTML += '<p><strong>' + msgData.handle + ': </strong>' + msgData.message + '</p>'
});
//Event 2: Key press typing -> spit out '[username] is typing' to dom
client_socket.on('typing', (uName) => {
    feedback.innerHTML = '<p><em>' + uName + ' is typing...</em></p>';
});