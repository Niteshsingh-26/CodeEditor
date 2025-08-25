import Editor from "@monaco-editor/react";
import "bootstrap/dist/css/bootstrap.min.css";

const EditorWrapper = ({
    code,
    language,
    handleCodeChange,
    userInput,
    setUserInput,
    runCode,
    outPut,
}) => {
    return (
        <div className="editor-wrapper d-flex flex-column h-100 position-relative">
            {/* Code Editor with margin */}
            <div className="flex-grow-1 border-bottom" style={{ padding: "8px 0 0 8px" }}>
                <Editor
                    height="100%"
                    language={language}
                    value={code}
                    onChange={handleCodeChange}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        padding: { top: 10 }, // extra space inside editor
                    }}
                />
            </div>

            {/* Input & Output Consoles */}
            <div className="d-flex border-top p-2" style={{ gap: "8px" }}>
                <textarea
                    className="form-control"
                    style={{
                        height: "110px",
                        width: "48%",
                        padding: "8px",
                        borderRadius: "5px",
                        resize: "none",
                    }}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter input here..."
                />
                <textarea
                    className="form-control"
                    style={{
                        height: "110px",
                        width: "52%",
                        padding: "8px",
                        borderRadius: "5px",
                        resize: "none",
                        backgroundColor: "#f8f9fa",
                    }}
                    value={outPut}
                    readOnly
                    placeholder="Output will appear here..."
                />
            </div>

            {/* Run Button */}
            <button
                className="btn btn-primary position-absolute"
                style={{ bottom: "10px", right: "10px", padding: "6px 14px" }}
                onClick={runCode}
            >
                Run
            </button>
        </div>
    );
};

export default EditorWrapper;
