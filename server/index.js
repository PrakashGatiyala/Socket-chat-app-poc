const http = require("http");
const { Server } = require("socket.io");

let socketStore = {};

function init() {
  try {
    const httpServer = http.createServer();

    const io = new Server(httpServer, {
      cors: "*",
    });

    io.on("connection", (socket) => {
      // For mapping user with latest socketID
      // socketStore[req.user._id] = socket;
      // to emit
      // io.to(socketStore["incomingUserId"]).emit()
      // /chat/groups/:groupID
      // chat/perons/:personID
      // ...
      socket.on("join-room", ({ roomId }) => {
        // DB- If this user has permission to join this room or not
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
      });

      socket.on("user-message", (data) => {
        console.log("Message Received: ", data);
        io.emit("incoming-message", data);
      });
      /* socket.on("user-message", (data, roomId) => {
        // Broadcast in this room roomId
        io.to(roomId).emit("incoming-message", data);
        // It is used for 1:1 messaging
        // io.to(socket.id).emit("");
        // Return msg to who made this request
        // socket.emit();
      });*/

      console.log("Socket Connected", socket.id);
      socket.on("disconnect", () => {
        console.log("Socket Disconnected for ", socket.id);
      });
    });

    httpServer.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  } catch (error) {
    console.log(`Error starting the server: ${error}`);
  }
}

init();
