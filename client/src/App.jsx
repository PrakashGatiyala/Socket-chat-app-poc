import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    socket.emit("user-message", { data: message });
    setMessage("");
  };
  const handleIncomingMessage = (data) => {
    console.log("Incoming Message: ", data);
    setMessages((prev) => {
      return [...prev, data.data];
    });
  };

  useEffect(() => {
    socket.on("incoming-message", handleIncomingMessage);
    return () => {
      socket.off("incoming-message", handleIncomingMessage);
    };
  }, []);

  return (
    <div className="main-container">
      <div>
        <div className="messages">
          {messages.map((msg, index) => {
            return (
              <div key={index} className="message">
                <p>{msg}</p>
              </div>
            );
          })}
        </div>
        <div className="input-container">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Enter your message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
