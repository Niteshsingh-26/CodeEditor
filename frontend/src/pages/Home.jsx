import { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

const Home = ({ onJoin }) => {
    const [roomId, setRoomId] = useState("");
    const [userName, setUserName] = useState("");

    const createRoomId = () => {
        setRoomId(uuid());
    };

    const joinRoom = () => {
        if (roomId && userName) {
            onJoin(roomId, userName);
        } else {
            toast.error("Please enter both Room ID and Name!");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div
                className="card shadow-lg p-4"
                style={{ width: "420px", borderRadius: "15px" }}
            >
                {/* App Branding */}
                <h1 className="text-center fw-bold mb-2 text-primary">
                    CollabCode Editor
                </h1>
                <p className="text-center text-muted mb-4">
                    Collaborate, code, and chat in real time.
                </p>

                {/* Room Id Input */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Room ID</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter or create Room ID"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                        />
                        <button className="btn btn-outline-primary" onClick={createRoomId}>
                            Create
                        </button>
                    </div>
                </div>

                {/* Username Input */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Your Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                {/* Join Button */}
                <button className="btn btn-primary w-100 mt-2" onClick={joinRoom}>
                    Join Room
                </button>

                {/* Footer */}
                <p className="text-center text-muted small mt-3">
                    Share your Room ID with friends to start coding together!
                </p>
            </div>
        </div>
    );
};

export default Home;
