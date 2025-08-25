import { useState, useEffect, useRef } from "react";

const ChatBox = ({ messages, sendMessage, userName, users }) => {
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (text.trim()) {
            sendMessage(text);
            setText("");
        }
    };

    return (
        <div className="d-flex flex-column h-100 border rounded mt-2px">
            {/* Header */}
            <div className="p-2 bg-primary text-white border-bottom d-flex flex-column align-items-center">
                <strong>Chat Box</strong>
                <div className="small mt-1 text-center">
                    Users: {users.map((user, i) => (
                        <span key={i} className="mx-1">
                            {user === userName ? "You" : user}
                        </span>
                    ))}
                </div>
            </div>

            {/* Messages container */}
            <div className="chat-root">
                <div className="chat-scroll p-2">
                    {messages.map((msg, i) => {
                        const isCurrentUser =
                            msg.user?.toString().trim().toLowerCase() ===
                            userName?.toString().trim().toLowerCase();

                        return (
                            <div
                                key={i}
                                className={`d-flex mb-2 ${isCurrentUser ? "justify-content-end" : "justify-content-start"
                                    }`}
                            >
                                <div
                                    className="p-2 rounded"
                                    style={{
                                        maxWidth: "70%",
                                        wordBreak: "break-word",
                                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                                        backgroundColor: "#ffffff",
                                        color: "#000",
                                        margin: "4px",
                                    }}
                                >
                                    <div className="small text-muted mb-1">
                                        {isCurrentUser ? "You" : msg.user}
                                    </div>
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })}
                    {/* ✅ Invisible div to scroll into view */}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input */}
            <div className="d-flex p-2 border-top bg-light">
                <input
                    type="text"
                    className="form-control"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button className="btn btn-primary ms-2" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
