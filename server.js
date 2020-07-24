const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { authenticate } = require("./api/auth/authMiddleware");
const authRouter = require("./api/auth/authRouter");
const jokesRouter = require("./api/jokes/jokesRouter");


const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);


module.exports = server;
