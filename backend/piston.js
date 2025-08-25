import axios from "axios";

// API call to Piston (code executor)

export const executeCode = async ({ code, language, version, input }) => {
  try {
    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language,
        version,
        files: [{ content: code }],
        stdin: input,
      }
    );
    return response.data;
  } catch (err) {
    return { run: { output: "⚠️ Error executing code" } };
  }
};
