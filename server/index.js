const http = require("http");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");

const app = express();
const port = 4500 || process.env.PORT;
app.use(cors());


//making server
const server = http.createServer(app);

//connection
const io = socketio(server);

app.get("/", (req, res) => {
  res.send("chat Route is working");
});

//when connection establish
io.on("connection", (socket) => {
  console.log("New connection with id ==" + socket.id);


  socket.on('request chat', ({ userId, targetUserId }) => {
    const roomId = generateRoomId( targetUserId);

    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);
    // the other user to join the same room
    socket.emit('join requested room', roomId);


  });

  socket.on('send message', ({ roomId, message }) => {
    io.to(roomId).emit('receive message', message);


 
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  });

  
const generateRoomId = ( targetUserId) => {
  // concatenate and sort the user IDs to ensure uniqueness
  return [ targetUserId].sort().join('-');
};

server.listen(port, () => {
  console.log(`server is working on port http://localhost:${port}`);
});
