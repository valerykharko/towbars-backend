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

server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    credentials: true,
    origin: [
      process.env.CLIENT_URL,
      process.env.CLIENT_URL1,
      process.env.CLIENT_URL2,
    ],
  })
);
server.use(express.urlencoded({ extended: false }));
server.use(
  express.static(path.resolve(__dirname, "src/database/static/images"))
);
server.use(
  express.static(path.resolve(__dirname, "src/database/static/documents"))
);
server.use(
  express.static(path.resolve(__dirname, "src/database/static/videos"))
);
server.use(fileUpload({}));
server.use("/api", router);

server.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
