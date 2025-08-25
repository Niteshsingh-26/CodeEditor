import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Main from "./pages/Main";
import "./App.css";

const App = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  const handleJoin = (roomId, userName) => {
    setRoomId(roomId);
    setUserName(userName);
    setJoined(true);
  };

  const handleLeave = () => {
    setJoined(false);
    setRoomId("");
    setUserName("");
  };

  return (
    <>
      <Toaster />
      {joined ? (
        <Main roomId={roomId} userName={userName} onLeave={handleLeave} />
      ) : (
        <Home onJoin={handleJoin} />
      )}
    </>
  );
};

export default App;
