import { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import { Link } from "react-router-dom";

const socket = socketIO.connect("http://localhost:8080/messageRoom");
function MessageRoom() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [messageInput, setMessageInput] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const emitSocketMessage = (e) => {
    e.preventDefault();

    if (messageInput) {
      socket.emit("message", {
        username: username,
        text: messageInput,
        date: new Date(),
      });
    }

    socket.emit("typing", false);
    setMessageInput("");
  };

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    socket.on("isTyping", (typing) => setIsTyping(typing));
  });

  return (
    <>
      <div>
        <h2>Chatroom</h2>

        {messages.map((message) => (
          <div>
            <b>{message.username} sent:</b>
            <p>{message.text}</p>
            <p>{message.date}</p>
          </div>
        ))}
      </div>
      <div>
        {isTyping ? <p>Someone is typing...</p> : null}
        <form onSubmit={emitSocketMessage}>
          <label>Username</label>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="message"
            value={messageInput}
            onChange={(e) => {
              socket.emit("typing", true);
              setMessageInput(e.target.value);
            }}
          />
          <input type="submit" value="Send" />
        </form>
      </div>
      <Link to="/">Home Room</Link>;
    </>
  );
}

export default MessageRoom;
