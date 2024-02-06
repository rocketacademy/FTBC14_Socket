const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const http = require("http").Server(app);

const socketIO = require("socket.io")(http, {
  cors: { origin: "http://localhost:5173" },
});

const socketNamespace = socketIO.of("/messageRoom");

socketNamespace.on("connection", async (socket) => {
  console.log(`${socket.id}, user just connected`);

  socket.on("message", (message) => {
    console.log("Message received", message.text);
    socketNamespace.emit("messageResponse", message);
  });

  socket.on("typing", (typing) => {
    if (typing) {
      socketNamespace.emit("isTyping", true);
    } else {
      socketNamespace.emit("isTyping", false);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user has abandoned us");
    socket.disconnect();
  });
});

const productNameSpace = socketIO.of("/products");

productNameSpace.on("connection", async (socket) => {
  console.log(`${socket.id}, user just connected`);

  socket.on("message", (message) => {
    console.log("Message received", message.text);
    productNameSpace.emit("messageResponse", message);
  });

  socket.on("typing", (typing) => {
    if (typing) {
      productNameSpace.emit("isTyping", true);
    } else {
      productNameSpace.emit("isTyping", false);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user has abandoned us");
    socket.disconnect();
  });
});

http.listen(8080, () => {
  console.log("Application listening to port 8080");
});
