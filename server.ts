import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import { config } from "dotenv";
import router from "./src/routes";
import sequelize from "./src/database/db";
import errorHandler from "./src/middlewares/ErrorHandlingMiddleware";

config();

const server = express();
const app = require("http").Server(server);
const io = require("socket.io")(app, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

server.use(express.json());
server.use(cookieParser());
server.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
server.use(express.urlencoded({ extended: false }));
server.use(
  express.static(path.resolve(__dirname, "src/database/static/documents"))
);
server.use(
  express.static(path.resolve(__dirname, "src/database/static/images"))
);
server.use(fileUpload({}));
server.use("/api", router);

server.use(errorHandler);

const PORT = process.env.PORT || 5000;

export const rooms = new Map();

io.on("connection", (socket) => {
  socket.on("ROOM:JOIN", ({ roomId, userName }) => {
    socket.join(roomId);
    rooms.get(roomId).get("users").set(socket.id, userName);
    const users = [...rooms.get(roomId).get("users").values()];
    socket.in(roomId).emit("ROOM:SET_USERS", users);
  });

  socket.on("ROOM:NEW_MESSAGE", ({ roomId, userName, text }) => {
    const obj = {
      userName,
      text,
    };
    rooms.get(roomId).get("messages").push(obj);
    socket.in(roomId).emit("ROOM:NEW_MESSAGE", obj);
  });

  socket.on("disconnect", () => {
    rooms.forEach((value, roomId) => {
      if (value.get("users").delete(socket.id)) {
        const users = [...value.get("users").values()];
        socket.in(roomId).emit("ROOM:SET_USERS", users);
      }
    });
  });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
