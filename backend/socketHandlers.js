import { executeCode } from "./piston.js";

//Store rooms data in memory
const rooms = new Map();

// Main Socket Handler
export const handleSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("join", ({ roomId, userName }) => {
      if (socket.currentRoom) leaveRoom(io, socket);

      socket.currentRoom = roomId;
      socket.currentUser = userName;
      socket.join(roomId);

      if (!rooms.has(roomId)) {
        rooms.set(roomId, {
          users: new Set(),
          code: "// start coding...",
          output: "",
          messages: [],
        });
      }

      const room = rooms.get(roomId);
      room.users.add(userName);

      socket.emit("userList", Array.from(room.users));
      socket.emit("codeUpdate", room.code);
      socket.emit("chatHistory", room.messages || []);
    });

    socket.on("languageChange", ({ roomId, language }) => {
      io.to(roomId).emit("languageUpdate", language);
    });

    socket.on(
      "compileCode",
      async ({ code, roomId, language, version, input }) => {
        if (!rooms.has(roomId)) return;
        const room = rooms.get(roomId);

        const result = await executeCode({
          code,
          language,
          version: "*",
          input,
        });
        room.output = result.run.output;

        io.to(roomId).emit("codeResponse", result);
      }
    );

    socket.on("sendMessage", ({ roomId, msg }) => {
      if (!rooms.has(roomId)) return;
      const room = rooms.get(roomId);

      room.messages.push(msg);
      io.to(roomId).emit("newMessage", msg);
    });

    socket.on("disconnect", () => {
      leaveRoom(io, socket);
      console.log("❌ User disconnected");
    });
  });
};

// ---------------- Helper: Leave Room ----------------
const leaveRoom = (io, socket) => {
  const { currentRoom, currentUser } = socket;
  if (currentRoom && currentUser && rooms.has(currentRoom)) {
    rooms.get(currentRoom).users.delete(currentUser);

    // Update remaining users
    io.to(currentRoom).emit(
      "userJoined",
      Array.from(rooms.get(currentRoom).users)
    );

    socket.leave(currentRoom);
    console.log(`👋 ${currentUser} left room ${currentRoom}`);
  }
  socket.currentRoom = null;
  socket.currentUser = null;
};
