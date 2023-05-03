import { useState } from "react";
import { io } from "socket.io-client";
import ChatScreen from "./components/ChatScreen";
import Welcome from "./components/Welcome";

const socket = io("http://localhost:5000");

function App() {
  const [nickname, setNickname] = useState("");
  const [room, setRoom] = useState("");
  const [chatReady, setChatReady] = useState(false);

  return (
    <div className="font-nunito min-h-screen bg-slate-700 text-white flex items-center justify-center">
      {chatReady === false ? <Welcome nickname={nickname} setNickname={setNickname} room={room} setRoom={setRoom} socket={socket} setChatReady={setChatReady} /> : <ChatScreen nickname={nickname} setNickname={setNickname} room={room} setRoom={setRoom} socket={socket} setChatReady={setChatReady}  />}
    </div>
  );
}

export default App;
