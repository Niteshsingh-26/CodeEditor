const Navbar = ({
    roomId,
    language,
    handleLanguageChange,
    copyRoomId,
    leaveRoom,
    copySuccess
}) => {
    return (
        <nav
            className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between align-items-center"
            style={{ height: "60px" }}
        >
            {/* Left Section */}
            <h4 className="mb-0 text-primary fw-bold">CollabCode</h4>

            {/* Middle Section */}
            <div className="d-flex align-items-center gap-3">
                {/* Room ID */}
                <span className="badge bg-secondary fs-6 px-3 py-2">
                    Room: {roomId.slice(0, 8)}...
                </span>

                {/* Copy Button */}
                <button
                    className="btn btn-outline-light btn-sm px-3"
                    onClick={copyRoomId}
                >
                    Copy ID
                </button>
                {copySuccess && <span className="copy-success">{copySuccess}</span>}
                {/* Language Selector */}
                <select
                    className="form-select form-select-sm w-auto fs-6"
                    value={language}
                    onChange={handleLanguageChange}
                >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                </select>
            </div>

            {/* Right Section */}
            <button
                className="btn btn-danger px-4 py-2 fw-bold"
                onClick={leaveRoom}
            >
                Leave
            </button>
        </nav>
    );
};

export default Navbar;
