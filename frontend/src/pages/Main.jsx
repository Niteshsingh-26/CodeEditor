import { useEffect, useState } from "react";
import socket from "../socket.js";
import EditorWrapper from "../components/EditorWrapper.jsx";
import ChatBox from "../components/Chatbox.jsx";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";

const Main = ({ roomId, userName, onLeave }) => {
    const [users, setUsers] = useState([]);
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("// start code here");
    const [outPut, setOutPut] = useState("");
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit("join", { roomId, userName });

        const handleUserList = (userList) => setUsers(userList);
        const handleCodeUpdate = (newCode) => setCode(newCode);
        const handleLanguageUpdate = (newLang) => setLanguage(newLang);
        const handleCodeResponse = (res) => setOutPut(res.run.output);
        const handleNewMessage = (msg) =>
            setMessages((prev) => [...prev, msg]);

        socket.on("userList", handleUserList);
        socket.on("codeUpdate", handleCodeUpdate);
        socket.on("languageUpdate", handleLanguageUpdate);
        socket.on("codeResponse", handleCodeResponse);
        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("userList", handleUserList);
            socket.off("codeUpdate", handleCodeUpdate);
            socket.off("languageUpdate", handleLanguageUpdate);
            socket.off("codeResponse", handleCodeResponse);
            socket.off("newMessage", handleNewMessage);
        };
    }, [roomId, userName]);

    const leaveRoom = () => {
        socket.emit("leaveRoom");
        onLeave();
    };

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        toast.success("Room Id copied successfully");
    };

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        socket.emit("codeChange", { roomId, code: newCode });
    };

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        setLanguage(newLanguage);
        socket.emit("languageChange", { roomId, language: newLanguage });
    };

    const runCode = () => {
        socket.emit("compileCode", {
            code,
            roomId,
            language,
            input: userInput,
        });
    };

    const sendMessage = (text) => {
        const msg = { user: userName, text };
        socket.emit("sendMessage", { roomId, msg });
    };

    return (
        <div className="container-fluid vh-100 d-flex flex-column p-0">
            {/* Navbar */}
            <Navbar
                roomId={roomId}
                language={language}
                handleLanguageChange={handleLanguageChange}
                copyRoomId={copyRoomId}
                leaveRoom={leaveRoom}
            />

            {/* Main Body */}
            <div className="row flex-grow-1 m-0">
                {/* Left: Code Editor */}
                <div className="col-8 p-0 d-flex flex-column">
                    <EditorWrapper
                        code={code}
                        language={language}
                        handleCodeChange={handleCodeChange}
                        userInput={userInput}
                        setUserInput={setUserInput}
                        runCode={runCode}
                        outPut={outPut}
                    />
                </div>

                {/* Right: Chat */}
                <div
                    className="col-4 border-start p-0 d-flex flex-column"
                    style={{ height: "92vh" }}
                >
                    <ChatBox
                        messages={messages}
                        sendMessage={sendMessage}
                        userName={userName}
                        users={users}
                    />
                </div>
            </div>
        </div>
    );
};

export default Main;
