const app = require('express')();
const server = require('http').createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*"
      }
});

io.on('connection', (socket) => {
    console.log('What is socket: ', socket);
    socket.on('chat', (payload) => {
        console.log('What is payload: ', payload);
        io.emit('chat', payload);
    })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running and up on ${PORT}!!`)
});