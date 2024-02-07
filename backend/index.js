import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import connectDB from "./db/connectDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  // root route http://localhost:5000/
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT ?? 4000;

connectDB()
  .then((res) => {
    server.listen(PORT, () => {
      console.log(`Server running on PORT : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error : ", err.message);
  });
